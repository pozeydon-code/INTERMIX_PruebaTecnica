namespace backend.Dtos;

public record CreateCartResponse(Guid cartId);
public record AddItemRequest(int productId, int quantity);
public record UpdateQuantityRequest(int quantity);
public record CartItemDto(int productId, string name, decimal price, int quantity);
public record CartDto(Guid id, IEnumerable<CartItemDto> items, decimal total);
