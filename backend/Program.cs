using Microsoft.AspNetCore.HttpLogging;
using backend;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddPresentation().AddInfrastructure();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("frontend", p =>
        p.WithOrigins("http://localhost:5173", "http://127.0.0.1:5173")
         .AllowAnyHeader().AllowAnyMethod().AllowCredentials());
});

builder.Services.AddHttpLogging(opt => opt.LoggingFields = HttpLoggingFields.All);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("frontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
