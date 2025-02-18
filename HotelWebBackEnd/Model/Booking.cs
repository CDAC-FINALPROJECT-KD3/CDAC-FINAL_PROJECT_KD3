using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelWebBackEnd.Model
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }  // Primary Key (booking_id)

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }  // Foreign Key linking to User

        [Required]
        [ForeignKey("Room")]
        public int RoomId { get; set; }  // Foreign Key linking to Room

        [Required]
        public DateTime CheckInDate { get; set; }  // Start date of stay

        [Required]
        public DateTime CheckOutDate { get; set; }  // End date of stay

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalPrice { get; set; }  // Total cost of the booking

        [Required]
        [EnumDataType(typeof(BookingStatus))]
        public BookingStatus Status { get; set; }  // Booking status (Enum)

        // Navigation Properties
        public User User { get; set; }
        public Room Room { get; set; }
    }

    // Enum for Booking Status
    public enum BookingStatus
    {
        Pending,
        Confirmed,
        Cancelled
    }

}
