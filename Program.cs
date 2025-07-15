using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Добавляем DbContext с подключением к PostgreSQL
builder.Services.AddDbContext<BirthdayContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Добавляем CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddRazorPages();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapRazorPages(); 

app.MapControllers(); 


app.Run();
