using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;

namespace backend.Logging;

public sealed class OrderLog : IOrderLog
{
    private readonly OrderLogOptions _opt;
    private readonly SemaphoreSlim _gate = new(1, 1);
    private static readonly JsonSerializerOptions JsonOpts = new()
    {
        WriteIndented = false
    };

    public OrderLog(IOptions<OrderLogOptions> options)
    {
        _opt = options.Value;
        string? dir = Path.GetDirectoryName(_opt.FilePath);
        if (!string.IsNullOrWhiteSpace(dir))
            Directory.CreateDirectory(dir);
    }

    public async Task WriteAsync(OrderLogEntry entry, CancellationToken ct = default)
    {
        await using FileStream fs = new FileStream(
            _opt.FilePath,
            FileMode.Append,
            FileAccess.Write,
            FileShare.Read
        );
        await using StreamWriter writer = new StreamWriter(fs, new UTF8Encoding(encoderShouldEmitUTF8Identifier: false));
        string? line = JsonSerializer.Serialize(entry, JsonOpts);
        await writer.WriteLineAsync(line);

    }
}
