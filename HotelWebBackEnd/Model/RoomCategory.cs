using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelWebBackEnd.Model
{
    [Table("RoomCategory")]
    public class RoomCategory
    {
        [Key]
        [Column("id",TypeName ="int")]
        public int Id { get; set; }

        //[Column("categoryName", TypeName = "varchar")]
        //[StringLength(50)]
        public string CategoryName { get; set; } // e.g., "Deluxe Room"

        //[Column("Description", TypeName = "varchar")]
        public string Description { get; set; }  // Details about the room
    }
}
