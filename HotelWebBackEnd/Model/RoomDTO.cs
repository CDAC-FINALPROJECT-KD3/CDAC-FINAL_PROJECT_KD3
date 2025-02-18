using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HotelWebBackEnd.Model
{
    public class RoomDTO
    {
        public int RoomNo { get; set; }

        public int HotelId { get; set; } 
        public string RoomType { get; set; }
        public decimal PricePerNight { get; set; } 
        public string City { get; set; }
        public string Description { get; set; }
        public IFormFile ImagesDto { get; set; }
        public bool Availability { get; set; }
    }
}
