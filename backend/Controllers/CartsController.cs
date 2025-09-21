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

    [HttpGet("{id:Guid}")]
    public async Task<IActionResult> Get(Guid id, CancellationToken ct)
    {
        var cart = await _service.GetCartAsync(id, ct);
        return cart is null ? NotFound() : Ok(cart);
    }

    [HttpPost("{id:Guid}/items")]
    public async Task<IActionResult> Add(Guid id, [FromBody] AddItemRequest body, CancellationToken ct)
    {
        await _service.AddItemAsync(id, body.productId, body.quantity, ct);
        return NoContent();
    }

    [HttpPatch("{id:Guid}/items/{productId:int}")]
    public async Task<IActionResult> UpdateQty(Guid id, int productId, [FromBody] UpdateQuantityRequest body, CancellationToken ct)
    {
        await _service.UpdateQtyAsync(id, productId, body.quantity, ct);
        return NoContent();
    }

    [HttpDelete("{id:Guid}/items/{productId:int}")]
    public async Task<IActionResult> Remove(Guid id, int productId, CancellationToken ct)
    {
        await _service.RemoveItemAsync(id, productId, ct);
        return NoContent();
    }

    [HttpDelete("{id:Guid}/items")]
    public async Task<IActionResult> Clear(Guid id, CancellationToken ct)
    {
        await _service.ClearAsync(id, ct);
        return NoContent();
    }
}
