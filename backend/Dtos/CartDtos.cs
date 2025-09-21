namespace backend.Dtos;

public record CreateCartResponse(int cartId);
public record AddItemRequest(int productId, int quantity);
public record UpdateQuantityRequest(int quantity);
public record CartItemDto(int productId, string name, decimal price, int quantity);
public record CartDto(int id, IEnumerable<CartItemDto> items, decimal subtotal, decimal tax, decimal total);
