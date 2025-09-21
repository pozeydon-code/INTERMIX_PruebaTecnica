namespace backend.Logging;

public record OrderLogEntry(
    string OrderNumber,
    DateTime Date,
    decimal Total,
    int ItemsCount,
    Guid CartId,
    IReadOnlyList<LoggedItem> Items
);

public record LoggedItem(int ProductId, int Quantity, decimal UnitPrice);
