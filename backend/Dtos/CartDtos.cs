namespace backend.Dtos;

public record CreateCartResponse(Guid cartId);
public record AddItemRequest(int productId, int quantity);
public record UpdateQuantityRequest(int quantity);
public record CartItemDto(int id, string name, decimal price, int quantity, string imageUrl);
public record CartDto(Guid id, IEnumerable<CartItemDto> items, decimal total);
