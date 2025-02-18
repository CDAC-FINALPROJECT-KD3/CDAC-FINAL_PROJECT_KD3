namespace HotelWebBackEnd.Model
{
    public class RoomDtoResponse
    {
        public int Id { get; set; }
        public int RoomNo { get; set; }
        public int HotelId { get; set; }
        public string RoomType { get; set; }
        public decimal PricePerNight { get; set; }
        public string City { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public bool Availability { get; set; }
    }
}
