namespace backend.Dtos;

public record ProductDto(
    int id,
    int code,
    string name,
    string? description,
    string brand,
    decimal price,
    string imageUrl,
    int categoryId);
