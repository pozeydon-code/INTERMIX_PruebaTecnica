using backend.Dtos;

namespace backend.Services.Interfaces;

public interface ICartService
{
    Task<Guid> CreateCartAsync(CancellationToken ct);
    Task<CartDto?> GetCartAsync(Guid id, CancellationToken ct);
    Task AddItemAsync(Guid cartId, int productId, int quantity, CancellationToken ct);
    Task UpdateQtyAsync(Guid cartId, int productId, int quantity, CancellationToken ct);
    Task RemoveItemAsync(Guid cartId, int productId, CancellationToken ct);
    Task ClearAsync(Guid cartId, CancellationToken ct);
}
