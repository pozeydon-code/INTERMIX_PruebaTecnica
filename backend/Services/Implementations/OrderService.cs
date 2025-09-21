using backend.Dtos;
using backend.Logging;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations;

public class OrderService : IOrderService
{
    private readonly ICartRepository _carts;
    private readonly ILogger<OrderService> _logger;
    private readonly IOrderLog _orderLog;
    public OrderService(ICartRepository carts, ILogger<OrderService> logger, IOrderLog orderLog)
    {
        _carts = carts;
        _logger = logger;
        _orderLog = orderLog;
    }

    public async Task<CreateOrderResponse> CreateAsync(CreateOrderRequest req, CancellationToken ct)
    {
        Cart cart = await _carts.GetAsync(req.cartId, ct) ?? throw new KeyNotFoundException("Cart not found");
        string orderNumber = $"ORD-{DateTime.UtcNow:yyyyMMddHHmmss}-{req.cartId.ToString()[..8]}";

        decimal total = cart.Total;
        int itemsCount = cart.Items.Count;

        _logger.LogInformation("Compra exitosa {Order} Total {Total} Items {Count}", orderNumber, total, itemsCount);

        OrderLogEntry entry = new OrderLogEntry(
            OrderNumber: orderNumber,
            Date: DateTime.UtcNow,
            Total: total,
            ItemsCount: itemsCount,
            CartId: req.cartId,
            Items: cart.Items
                .Select(i => new LoggedItem(i.Id, i.Quantity, i.Price))
                .ToList()
        );
        await _orderLog.WriteAsync(entry, ct);

        cart.Clear();
        await _carts.SaveAsync(cart, ct);
        return new CreateOrderResponse(orderNumber, DateTime.UtcNow, total);
    }
}
