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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotels>>> Gethotels()
        {
          if (_context.hotels == null)
          {
              return NotFound();
          }
            return await _context.hotels.ToListAsync();
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

        // GET: api/Hotels/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Hotels>> GetHotels(int id)
        //{
        //  if (_context.hotels == null)
        //  {
        //      return NotFound();
        //  }
        //    var hotels = await _context.hotels.FindAsync(id);

        //    if (hotels == null)
        //    {
        //        return NotFound();
        //    }

        //    return hotels;
        //}
        [HttpGet("{id}")]
        public async Task<ActionResult<HotelsDTOResponse>> GetHotels(int id)
        {
            if (_context.hotels == null)
            {
                return NotFound();
            }

            var hotel = await _context.hotels.FindAsync(id);

            if (hotel == null)
            {
                return NotFound();
            }

            var hotelDto = new HotelsDTOResponse
            {
                Id = hotel.Id,
                Hotel_Name = hotel.Hotel_Name,
                Address = hotel.Address,
                City = hotel.City,
                Description = hotel.Description,
                Ratings = hotel.Ratings,
                ImageUrl = $"{Request.Scheme}://{Request.Host}/images/{hotel.Images}" // Ensure correct image URL
            };

            return Ok(hotelDto);
        }


        //[HttpPost]
        //public IActionResult AddHotels(HotelsDTO hotelsDTO)
        //{
        //    string fileName = "";
        //    if(hotelsDTO.ImagesDto !=null)
        //    {
        //        string folder=Path.Combine(env.WebRootPath,"images");
        //        fileName = Guid.NewGuid().ToString() + "_" + hotelsDTO.ImagesDto.FileName;
        //        string filePath=Path.Combine(folder,fileName);
        //        hotelsDTO.ImagesDto.CopyTo(new FileStream(filePath,FileMode.Create));

        //        Hotels htl = new Hotels()
        //        {
        //            Hotel_Name = hotelsDTO.Hotel_Name,
        //            Address = hotelsDTO.Address,
        //            City = hotelsDTO.City,
        //            Description = hotelsDTO.Description,
        //            Ratings = hotelsDTO.Ratings,
        //            Images=fileName
        //        };
        //        _context.hotels.Add(htl);
        //        _context.SaveChanges();
        //        return Ok("Success");
        //    }
        //    return BadRequest("Hotel Not Added");
        //}
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



        // PUT: api/Hotels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutHotels(int id, Hotels hotels)
        //{
        //    if (id != hotels.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(hotels).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!HotelsExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHotels(int id, [FromForm] HotelsDTO hotelsDTO)
        {
            if (_context.hotels == null)
            {
                return NotFound();
            }

            var existingHotel = await _context.hotels.FindAsync(id);
            if (existingHotel == null)
            {
                return NotFound();
            }

            // Update fields
            existingHotel.Hotel_Name = hotelsDTO.Hotel_Name;
            existingHotel.Address = hotelsDTO.Address;
            existingHotel.City = hotelsDTO.City;
            existingHotel.Description = hotelsDTO.Description;
            existingHotel.Ratings = hotelsDTO.Ratings;

            // Handle image update if a new image is provided
            if (hotelsDTO.ImagesDto != null && hotelsDTO.ImagesDto.Length > 0)
            {
                string folder = Path.Combine(env.WebRootPath, "images");
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                string fileName = Guid.NewGuid().ToString() + "_" + hotelsDTO.ImagesDto.FileName;
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    hotelsDTO.ImagesDto.CopyTo(stream);
                }

                existingHotel.Images = fileName; // Update image filename
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HotelsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { status = "success", message = "Hotel updated successfully" });
        }

        // POST: api/Hotels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Hotels>> PostHotels(Hotels hotels)
        //{
        //  if (_context.hotels == null)
        //  {
        //      return Problem("Entity set 'MyDbContext.hotels'  is null.");
        //  }
        //    _context.hotels.Add(hotels);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetHotels", new { id = hotels.Id }, hotels);
        //}

        // DELETE: api/Hotels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotels(int id)
        {
            if (_context.hotels == null)
            {
                return NotFound();
            }
            var hotels = await _context.hotels.FindAsync(id);
            if (hotels == null)
            {
                return NotFound();
            }

            _context.hotels.Remove(hotels);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HotelsExists(int id)
        {
            return (_context.hotels?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
