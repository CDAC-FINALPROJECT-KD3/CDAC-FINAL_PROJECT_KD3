using System.ComponentModel.DataAnnotations.Schema;

namespace HotelWebBackEnd.Model
{
    public class HotelsDTO
    {
        public string Hotel_Name { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Description { get; set; }

        public decimal Ratings { get; set; }

        public IFormFile ImagesDto { get; set; }


    }
}
