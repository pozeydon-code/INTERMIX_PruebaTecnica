namespace backend.Models;

public class Cart
{
    private int MAX_ITEMS = 5;

    public Guid Id { get; set; } = Guid.NewGuid();
    public List<CartItem> Items { get; set; } = new();

    public decimal Total => Items.Sum(i => i.Price * i.Quantity);

    public void Add(Product product, int quantity)
    {
        CartItem? item = Items.FirstOrDefault(i => i.Id == product.Id);
        if (item is null)
            Items.Add(new CartItem { Id = product.Id, Name = product.Name, Price = product.Price, Quantity = quantity, ImageUrl = $"https://picsum.photos/seed/{product.Id}/480/360" });
        else
            item.Quantity = Math.Min(MAX_ITEMS, item.Quantity + quantity);
    }

    public void SetQty(int productId, int quantity)
    {
        CartItem? item = Items.FirstOrDefault(i => i.Id == productId);
        if (item is null) return;
        item.Quantity = Math.Clamp(quantity, 1, MAX_ITEMS);
    }

    public void Remove(int productId) => Items.RemoveAll(i => i.Id == productId);
    public void Clear() => Items.Clear();
}
