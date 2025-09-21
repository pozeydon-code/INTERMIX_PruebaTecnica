namespace backend.Logging;

public interface IOrderLog
{
    Task WriteAsync(OrderLogEntry entry, CancellationToken ct = default);
}
