using backend.Models;

namespace backend.Repositories.Interfaces;

public interface ICatalogRepository
{
    Task<IReadOnlyList<Product>> GetProductsAsync(int? categoryId = null, CancellationToken ct = default);
    Task<Product?> GetByIdAsync(int id, CancellationToken ct = default);
}

