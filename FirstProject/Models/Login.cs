using System.ComponentModel.DataAnnotations;

namespace FirstProject.Models
{
    public class Login
    {
        [Key]
        public int Id { get; set; }
        public string Username{ get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
