using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelWebBackEnd.Model
{
    [Table("Hotels")]
    public class Hotels
    {
        [Key]
        [Column("id", TypeName = "int")]
        public int Id { get; set; }

        //[Column("Hotel_Name",TypeName = "varchar")]
        //[StringLength(50)]
        public string Hotel_Name { get; set; }

        //[Column("Address", TypeName = "Text")]
        public string Address { get; set; }

        //[Column("City", TypeName = "Text")]
        public string City { get; set; }
        //[Column("Description", TypeName = "Text")]
        public string Description { get; set; }

        //[Column("Ratings")]
        public decimal Ratings { get; set; }

        // Navigation Property
        //public List<Room> Rooms { get; set; }
        //// Navigation Property for Images
        //[Column("ImageURL", TypeName = "varchar")]
        public string Images { get; set; }

        //[Column("isActive", TypeName = "bit")]
        public bool IsActive { get; set; } = true;  // Default Value
    }
}
