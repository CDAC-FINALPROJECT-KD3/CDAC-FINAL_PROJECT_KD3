using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelWebBackEnd.Model
{
    [Table("User")]

    public class User
    {
        [Key]
        [Column("id",TypeName ="int")]
        public int Id { get; set; }
        [Column("firstName", TypeName = "varchar")]
        [StringLength(50)]
        public string FirstName { get; set; }
        [Column("lastName", TypeName = "varchar")]
        [StringLength(50)]
        public string LastName { get; set; }
        [Column("email", TypeName = "varchar")]
        [StringLength(50)]
        public string Email { get; set; }
        [Column("mobileNo", TypeName = "varchar")]
        [StringLength(50)]
        public string MobileNo { get; set; }
        [Column("password", TypeName = "varchar")]
        [StringLength(50)]
        public string Password { get; set; }

        [Column("role", TypeName = "varchar")]
        [StringLength(50)]
        public string Role { get; set; }

        // isActive with Default Value 1
        [Column("isActive", TypeName = "bit")]
        public bool IsActive { get; set; } = true;  // Default Value

        //// Timestamp for CreatedAt
        //[Column("createdAt")]
        //public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //// Timestamp for UpdatedAt
        //[Column("updatedAt")]
        //public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
