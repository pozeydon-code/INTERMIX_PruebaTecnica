using backend.Dtos;

namespace backend.Services.Interfaces;

public interface IOrderService
{
    Task<CreateOrderResponse> CreateAsync(CreateOrderRequest req, CancellationToken ct);
}
