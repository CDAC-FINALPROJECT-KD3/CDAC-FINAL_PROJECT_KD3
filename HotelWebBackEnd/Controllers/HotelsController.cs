using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HotelWebBackEnd.DataBase;
using HotelWebBackEnd.Model;
using System.Net;

namespace HotelWebBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly MyDbContext _context;
        IWebHostEnvironment env;

        public HotelsController(MyDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            this.env = env;
        }

        // GET: api/Hotels

        [HttpPost]
        public IActionResult AddHotels([FromForm] HotelsDTO hotelsDTO)
        {
            try
            {
                if (hotelsDTO.ImagesDto == null || hotelsDTO.ImagesDto.Length == 0)
                {
                    return BadRequest("Invalid image file");
                }

                // Ensure the images folder exists
                string folder = Path.Combine(env.WebRootPath, "images");
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                // Generate a unique file name
                string fileName = Guid.NewGuid().ToString() + "_" + hotelsDTO.ImagesDto.FileName;
                string filePath = Path.Combine(folder, fileName);

                // Save image to server
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    hotelsDTO.ImagesDto.CopyTo(stream);
                }

                // Save hotel details with image file name
                Hotels htl = new Hotels()
                {
                    Hotel_Name = hotelsDTO.Hotel_Name,
                    Address = hotelsDTO.Address,
                    City = hotelsDTO.City,
                    Description = hotelsDTO.Description,
                    Ratings = hotelsDTO.Ratings,
                    Images = fileName // Save file name (not full path)
                };

                _context.hotels.Add(htl);
                _context.SaveChanges();

                // Return success response with image URL
                string imageUrl = $"{Request.Scheme}://{Request.Host}/images/{fileName}";
                return Ok(new { status = "success", message = "Hotel added successfully", imageUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal Server Error", details = ex.Message });
            }
        }

        [HttpGet("WithImg")]
        public async Task<ActionResult<IEnumerable<HotelsDTOResponse>>> GethotelsWithImg()
        {
            if (_context.hotels == null)
            {
                return NotFound();
            }

            var hotels = await _context.hotels
                .Select(hotel => new HotelsDTOResponse
                {
                    Id = hotel.Id,
                    Hotel_Name = hotel.Hotel_Name,
                    Address = hotel.Address,
                    City = hotel.City,
                    Description = hotel.Description,
                    Ratings = hotel.Ratings,
                    ImageUrl = $"{Request.Scheme}://{Request.Host}/images/{hotel.Images}" // Generate full URL for images
                }).ToListAsync();

            return Ok(hotels);
        }


    }
}
