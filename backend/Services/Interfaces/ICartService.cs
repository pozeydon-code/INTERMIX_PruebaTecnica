using backend.Dtos;

namespace backend.Services.Interfaces;

public interface ICartService
{
    Task<int> CreateCartAsync(CancellationToken ct);
    Task<CartDto?> GetCartAsync(int id, CancellationToken ct);
    Task AddItemAsync(int cartId, int productId, int quantity, CancellationToken ct);
    Task UpdateQtyAsync(int cartId, int productId, int quantity, CancellationToken ct);
    Task RemoveItemAsync(int cartId, int productId, CancellationToken ct);
    Task ClearAsync(int cartId, CancellationToken ct);
}

