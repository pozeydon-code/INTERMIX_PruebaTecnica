namespace backend.Models;

public class Cart
{
    private int MAX_ITEMS = 5;

    public int Id { get; set; }
    public List<CartItem> Items { get; set; } = new();

    public decimal Subtotal => Items.Sum(i => i.Price * i.Quantity);
    public decimal Tax => Subtotal * 0.12m;
    public decimal Total => Subtotal + Tax;

    public void Add(Product product, int quantity)
    {
        CartItem? item = Items.FirstOrDefault(i => i.ProductId == product.Id);
        if (item is null)
            Items.Add(new CartItem { ProductId = product.Id, Name = product.Name, Price = product.Price, Quantity = quantity });
        else
            item.Quantity = Math.Min(MAX_ITEMS, item.Quantity + quantity);
    }

    public void SetQty(int productId, int quantity)
    {
        CartItem? item = Items.FirstOrDefault(i => i.ProductId == productId);
        if (item is null) return;
        item.Quantity = Math.Clamp(quantity, 1, MAX_ITEMS);
    }

    public void Remove(int productId) => Items.RemoveAll(i => i.ProductId == productId);
    public void Clear() => Items.Clear();
}
