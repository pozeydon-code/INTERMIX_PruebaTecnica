using backend.Dtos;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations;

public class OrderService : IOrderService
{
    private readonly ICartRepository _carts;
    private readonly ILogger<OrderService> _logger;

    public OrderService(ICartRepository carts, ILogger<OrderService> logger)
    {
        _carts = carts;
        _logger = logger;
    }

    public async Task<CreateOrderResponse> CreateAsync(CreateOrderRequest req, CancellationToken ct)
    {
        Cart cart = await _carts.GetAsync(req.cartId, ct) ?? throw new KeyNotFoundException("Cart not found");
        string orderNumber = $"ORD-{DateTime.UtcNow:yyyyMMddHHmmss}-{req.cartId.ToString()[..8]}";

        _logger.LogInformation("Compra exitosa {Order} Total {Total} Items {Count}", orderNumber, cart.Total, cart.Items.Count);

        await _carts.SaveAsync(cart, ct);
        cart.Clear();
        return new CreateOrderResponse(orderNumber, DateTime.UtcNow, cart.Total);
    }
}
