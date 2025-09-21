using backend.Dtos;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations;

public class CartService : ICartService
{
    private readonly ICartRepository _carts;
    private readonly ICatalogRepository _catalog;

    public CartService(ICartRepository carts, ICatalogRepository catalog)
    {
        _carts = carts;
        _catalog = catalog;
    }

    public Task<int> CreateCartAsync(CancellationToken ct) => _carts.CreateAsync(ct).ContinueWith(t => t.Result.Id, ct);

    public async Task<CartDto?> GetCartAsync(int id, CancellationToken ct)
    {
        Cart? cart = await _carts.GetAsync(id, ct);
        if (cart is null) return null;
        var items = cart.Items.Select(i => new CartItemDto(i.ProductId, i.Name, i.Price, i.Quantity));
        return new CartDto(cart.Id, items, cart.Subtotal, cart.Tax, cart.Total);
    }

    public async Task AddItemAsync(int cartId, int productId, int quantity, CancellationToken ct)
    {
        Cart cart = await _carts.GetAsync(cartId, ct) ?? throw new KeyNotFoundException("Cart not found");
        var prod = await _catalog.GetByIdAsync(productId, ct) ?? throw new KeyNotFoundException("Product not found");
        if (quantity < 1) quantity = 1;
        cart.Add(prod, quantity);
        await _carts.SaveAsync(cart, ct);
    }

    public async Task UpdateQtyAsync(int cartId, int productId, int quantity, CancellationToken ct)
    {
        Cart cart = await _carts.GetAsync(cartId, ct) ?? throw new KeyNotFoundException("Cart not found");
        cart.SetQty(productId, quantity);
        await _carts.SaveAsync(cart, ct);
    }

    public async Task RemoveItemAsync(int cartId, int productId, CancellationToken ct)
    {
        Cart cart = await _carts.GetAsync(cartId, ct) ?? throw new KeyNotFoundException("Cart not found");
        cart.Remove(productId);
        await _carts.SaveAsync(cart, ct);
    }

    public async Task ClearAsync(int cartId, CancellationToken ct)
    {
        Cart cart = await _carts.GetAsync(cartId, ct) ?? throw new KeyNotFoundException("Cart not found");
        cart.Clear();
        await _carts.SaveAsync(cart, ct);
    }
}
