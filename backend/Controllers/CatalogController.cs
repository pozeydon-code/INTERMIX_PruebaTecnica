using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("catalog")]
public class CatalogController : ControllerBase
{
    private readonly ICatalogService _service;
    public CatalogController(ICatalogService service) => _service = service;

    [HttpGet("products")]
    public async Task<IActionResult> GetProducts([FromQuery] int? categoryId, CancellationToken ct)
        => Ok(await _service.GetProductsAsync(categoryId, ct));

    [HttpGet("/products/{id:int}")]
    public async Task<IActionResult> GetProduct(int id, CancellationToken ct)
    {
        var p = await _service.GetProductAsync(id, ct);
        return p is null ? NotFound() : Ok(p);
    }
}
