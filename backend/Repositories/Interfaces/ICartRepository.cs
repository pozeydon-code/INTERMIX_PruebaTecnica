using backend.Models;

namespace backend.Repositories.Interfaces;

public interface ICartRepository
{
    Task<Cart> CreateAsync(CancellationToken ct = default);
    Task<Cart?> GetAsync(int id, CancellationToken ct = default);
    Task SaveAsync(Cart cart, CancellationToken ct = default);
}

