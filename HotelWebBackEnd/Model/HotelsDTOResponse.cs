namespace HotelWebBackEnd.Model
{
    public class HotelsDTOResponse
    {
        public int Id { get; set; }
        public string Hotel_Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Description { get; set; }
        public decimal Ratings { get; set; }
        public string ImageUrl { get; set; } // Full URL of the image
    }
}
