using backend.Dtos;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations;

public class CatalogService : ICatalogService
{
    private readonly ICatalogRepository _repo;

    public CatalogService(ICatalogRepository repo) => _repo = repo;

    public async Task<IReadOnlyList<ProductDto>> GetProductsAsync(int? categoryId, CancellationToken ct)
    {
        IReadOnlyList<Product>? list = await _repo.GetProductsAsync(categoryId, ct);
        return list.Select(p => new ProductDto(p.Id, p.Code, p.Name, p.Description, p.Brand, p.Price, p.ImageUrl, p.CategoryId)).ToList();
    }

    public async Task<ProductDto?> GetProductAsync(int id, CancellationToken ct)
    {
        var p = await _repo.GetByIdAsync(id, ct);
        return p is null ? null : new ProductDto(p.Id, p.Code, p.Name, p.Description, p.Brand, p.Price, p.ImageUrl, p.CategoryId);
    }
}
