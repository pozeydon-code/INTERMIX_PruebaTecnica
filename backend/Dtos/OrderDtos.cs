namespace backend.Dtos;

public record CreateOrderRequest(int cartId);
public record CreateOrderResponse(string orderNumber, DateTime createdAt, decimal total);
