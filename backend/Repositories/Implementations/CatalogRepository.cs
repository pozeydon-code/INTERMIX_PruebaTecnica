using System.Text.Json;
using backend.Models;
using backend.Repositories.Interfaces;

namespace backend.Repositories.Implementations;

public class CatalogRepository : ICatalogRepository
{
    private readonly List<Product> _products;

    public CatalogRepository(IWebHostEnvironment env)
    {
        string? path = Path.Combine(env.ContentRootPath, "seed", "products.json");
        string? raw = File.Exists(path) ? File.ReadAllText(path) : "[]";

        using JsonDocument doc = JsonDocument.Parse(raw);
        JsonElement categories = doc.RootElement;

        List<Product> list = new List<Product>();
        foreach (JsonElement category in categories.EnumerateArray())
        {
            int categoryId = category.GetProperty("caprId").GetInt32();
            if (!category.TryGetProperty("catalogoProd", out JsonElement products)) continue;

            foreach (JsonElement product in products.EnumerateArray())
            {
                int id = product.TryGetProperty("cproId", out JsonElement idValue) ? idValue.GetInt32() : product.GetProperty("cproCodigo").GetInt32();
                int code = product.TryGetProperty("cproCodigo", out JsonElement codeValue) ? codeValue.GetInt32() : id;
                string name = product.TryGetProperty("cproNombre", out JsonElement nameValue) ? nameValue.GetString()! : $"Product {id}";
                string desc = product.TryGetProperty("cproDescripcion", out JsonElement descValue) ? descValue.GetString() ?? "" : "";
                string brand = product.TryGetProperty("cproMarca", out JsonElement brandValue) ? brandValue.GetString() ?? "Genérico" : "Genérico";
                decimal price = product.TryGetProperty("price", out JsonElement priceValue) && priceValue.ValueKind is not JsonValueKind.Null
                    ? priceValue.GetDecimal()
                    : (code % 50) + 9.99m;
                string img = product.TryGetProperty("imageUrl", out JsonElement imageValue) && imageValue.ValueKind == JsonValueKind.String
                    ? imageValue.GetString()!
                    : $"https://picsum.photos/seed/{id}/480/360";

                list.Add(new Product
                {
                    Id = id,
                    Code = code,
                    Name = name,
                    Description = desc,
                    Brand = brand,
                    Price = price,
                    ImageUrl = img,
                    CategoryId = categoryId
                });
            }
        }

        _products = list;
    }

    public Task<Product?> GetByIdAsync(int id, CancellationToken ct = default) => Task.FromResult(_products.FirstOrDefault(product => product.Id == id));

    public Task<IReadOnlyList<Product>> GetProductsAsync(int? categoryId = null, CancellationToken ct = default)
    {
        IEnumerable<Product>? products = _products.AsEnumerable();
        if (categoryId.HasValue) products = products.Where(p => p.CategoryId == categoryId.Value);
        return Task.FromResult((IReadOnlyList<Product>)products.ToList());
    }
}

