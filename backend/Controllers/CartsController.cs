using backend.Dtos;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("carts")]
public class CartsController : ControllerBase
{
    private readonly ICartService _service;
    public CartsController(ICartService service) => _service = service;

    [HttpPost]
    public async Task<IActionResult> Create(CancellationToken ct)
        => Ok(new CreateCartResponse(await _service.CreateCartAsync(ct)));

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id, CancellationToken ct)
    {
        var c = await _service.GetCartAsync(id, ct);
        return c is null ? NotFound() : Ok(c);
    }

    [HttpPost("{id:int}/items")]
    public async Task<IActionResult> Add(int id, [FromBody] AddItemRequest body, CancellationToken ct)
    {
        await _service.AddItemAsync(id, body.productId, body.quantity, ct);
        return NoContent();
    }

    [HttpPatch("{id:int}/items/{productId:int}")]
    public async Task<IActionResult> UpdateQty(int id, int productId, [FromBody] UpdateQuantityRequest body, CancellationToken ct)
    {
        await _service.UpdateQtyAsync(id, productId, body.quantity, ct);
        return NoContent();
    }

    [HttpDelete("{id:int}/items/{productId:int}")]
    public async Task<IActionResult> Remove(int id, int productId, CancellationToken ct)
    {
        await _service.RemoveItemAsync(id, productId, ct);
        return NoContent();
    }

    [HttpDelete("{id:int}/items")]
    public async Task<IActionResult> Clear(int id, CancellationToken ct)
    {
        await _service.ClearAsync(id, ct);
        return NoContent();
    }
}
