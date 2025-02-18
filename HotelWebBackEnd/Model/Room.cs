using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelWebBackEnd.Model
{
    [Table("Room")]
    public class Room
    {
        [Key]
        [Column("id", TypeName = "int")]
        public int Id { get; set; }  // Primary Key

        [Column("RoomNo",TypeName ="int")]
        public int RoomNo { get; set; }
        //[Required]
        [ForeignKey("Hotel")]
        public int HotelId { get; set; }  // Foreign Key linking to Hotel

        [Column("Room_type", TypeName = "varchar")]
        [StringLength(50)]
        public string RoomType { get; set; }  // Single, Double, Suite, etc.

        //[Required]
        [Column("Price_per_night",TypeName = "decimal(10,2)")]
        public decimal PricePerNight { get; set; }  // Cost per night

        [Column("City", TypeName = "varchar")]
        [StringLength(50)]
        public string City { get; set; }

        public string Description { get; set; }
        //// Navigation Property
        //public Hotels hotel { get; set; }
        //public List<Booking> Bookings { get; set; }
        public string Images { get; set; }
        public bool Availability { get; set; }  // True = Available, False = Booked
        [Column("isActive", TypeName = "bit")]
        public bool IsActive { get; set; } = true;  // Default Value
    }
}
