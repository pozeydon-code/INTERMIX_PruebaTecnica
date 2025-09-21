namespace backend.Dtos;

public record CreateOrderRequest(Guid cartId);
public record CreateOrderResponse(string orderNumber, DateTime createdAt, decimal total);
