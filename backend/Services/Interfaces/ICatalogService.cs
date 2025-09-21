using backend.Dtos;

namespace backend.Services.Interfaces;

public interface ICatalogService
{
    Task<IReadOnlyList<ProductDto>> GetProductsAsync(int? categoryId, CancellationToken ct);
    Task<ProductDto?> GetProductAsync(int id, CancellationToken ct);
}
