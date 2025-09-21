using System.Collections.Concurrent;
using backend.Models;
using backend.Repositories.Interfaces;

namespace backend.Repositories.Implementations;

public class CartRepository : ICartRepository
{
    private readonly ConcurrentDictionary<int, Cart> _db = new();

    public Task<Cart> CreateAsync(CancellationToken ct = default)
    {
        Cart c = new Cart();
        _db[c.Id] = c;
        return Task.FromResult(c);
    }

    public Task<Cart?> GetAsync(int id, CancellationToken ct = default)
        => Task.FromResult(_db.TryGetValue(id, out Cart? cart) ? cart : null);

    public Task SaveAsync(Cart cart, CancellationToken ct = default)
    {
        _db[cart.Id] = cart;
        return Task.CompletedTask;
    }
}
