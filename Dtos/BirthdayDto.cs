using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

public class BirthdayDto
{
    public int Id { get; set; } 

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public DateTime BirthDate { get; set; }

    public string? PhotoPath { get; set; }

    public IFormFile? Photo { get; set; }
}
