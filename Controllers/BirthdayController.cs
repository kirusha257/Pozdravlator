using Microsoft.AspNetCore.Mvc;
using practice.Data; 
using practice.Models; 

namespace practice.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BirthdayController : ControllerBase
    {
        private readonly BirthdayContext _context;

        public BirthdayController(BirthdayContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddBirthday([FromForm] BirthdayDto dto)
        {
            var birthday = new Birthday
            {
                Name = dto.Name,
                BirthDate = DateTime.SpecifyKind(dto.BirthDate, DateTimeKind.Utc),
            };

            if (dto.Photo != null && dto.Photo.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Photo.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Photo.CopyToAsync(stream);
                }

                birthday.PhotoPath = $"/uploads/{fileName}";
            }

            _context.Birthdays.Add(birthday);
            await _context.SaveChangesAsync();
            return Ok(birthday);
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Birthdays.ToList());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBirthday(int id)
        {
            var birthday = await _context.Birthdays.FindAsync(id);
            if (birthday == null)
            {
                return NotFound();
            }

            _context.Birthdays.Remove(birthday);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBirthday(int id, [FromForm] BirthdayDto dto)
        {
            if (id != dto.Id)
                return BadRequest("ID в URL и ID в теле запроса не совпадают");

            var existing = await _context.Birthdays.FindAsync(id);
            if (existing == null)
                return NotFound();

            existing.Name = dto.Name;
            existing.BirthDate = DateTime.SpecifyKind(dto.BirthDate, DateTimeKind.Utc);

            if (dto.Photo != null && dto.Photo.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Photo.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Photo.CopyToAsync(stream);
                }

                existing.PhotoPath = $"/uploads/{fileName}";
            }
            else if (!string.IsNullOrEmpty(dto.PhotoPath))
            {
                existing.PhotoPath = dto.PhotoPath;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }



    }
}
