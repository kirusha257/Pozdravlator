namespace practice.Models
{
    public class Birthday
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime BirthDate { get; set; }
        public string? PhotoPath { get; set; } = string.Empty;
    }
}