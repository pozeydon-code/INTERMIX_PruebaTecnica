namespace backend.Models;

public class Product
{
    public int Id { get; set; }
    public int Code { get; set; }
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public string Brand { get; set; } = "Genérico";
    public decimal Price { get; set; }
    public string ImageUrl { get; set; } = "";
    public int CategoryId { get; set; }
}
