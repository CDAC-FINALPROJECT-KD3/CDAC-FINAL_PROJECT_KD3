using HotelWebBackEnd.DataBase;
using HotelWebBackEnd.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HotelWebBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly MyDbContext _context;
        IWebHostEnvironment env;

        public RoomController(MyDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            this.env = env;
        }

        // GET: api/<RoomController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<RoomController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoomDtoResponse>> GetHotels(int id)
        {
            if (_context.rooms == null)
            {
                return NotFound();
            }

            var room = await _context.rooms.FindAsync(id);

            if (room == null)
            {
                return NotFound();
            }

            var roomDto = new RoomDtoResponse
            {
                Id = room.Id,
                RoomNo = room.RoomNo,
                HotelId = room.HotelId,
                RoomType = room.RoomType,
                PricePerNight = room.PricePerNight,
                City = room.City,
                Description = room.Description,
                ImageUrl = $"{Request.Scheme}://{Request.Host}/images/{room.Images}", // Generate full URL for images
                Availability = room.Availability
            };

            return Ok(roomDto);
        }
        [HttpGet("WithImg")]
        public async Task<ActionResult<IEnumerable<RoomDtoResponse>>> GethotelsWithImg()
        {
            if (_context.hotels == null)
            {
                return NotFound();
            }

            var rooms = await _context.rooms
                .Select(room => new RoomDtoResponse
                {
                    Id = room.Id,
                    RoomNo = room.RoomNo,
                    HotelId = room.HotelId,
                    RoomType = room.RoomType,
                    PricePerNight = room.PricePerNight,
                    City = room.City,
                    Description = room.Description,
                    ImageUrl = $"{Request.Scheme}://{Request.Host}/images/{room.Images}", // Generate full URL for images
                    Availability=room.Availability
                }).ToListAsync();

            return Ok(rooms);
        }

        // POST api/<RoomController>
        [HttpPost]
        public IActionResult AddRooms([FromForm] RoomDTO roomDTO)
        {
            try
            {
                if (roomDTO.ImagesDto == null || roomDTO.ImagesDto.Length == 0)
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
                string fileName = Guid.NewGuid().ToString() + "_" + roomDTO.ImagesDto.FileName;
                string filePath = Path.Combine(folder, fileName);

                // Save image to server
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    roomDTO.ImagesDto.CopyTo(stream);
                }

                // Save hotel details with image file name
                Room rm = new Room()
                {
                    RoomNo = roomDTO.RoomNo,
                    RoomType = roomDTO.RoomType,
                    HotelId = roomDTO.HotelId,
                    PricePerNight = roomDTO.PricePerNight,
                    City = roomDTO.City,
                    Description = roomDTO.Description,
                    Availability = roomDTO.Availability,
                    Images = fileName // Save file name (not full path)
                };

                _context.rooms.Add(rm);
                _context.SaveChanges();

                // Return success response with image URL
                string imageUrl = $"{Request.Scheme}://{Request.Host}/images/{fileName}";
                return Ok(new { status = "success", message = "Room added successfully", imageUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal Server Error", details = ex.Message });
            }
        }


        // PUT api/<RoomController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoom(int id, [FromForm] RoomDTO roomDTO)
        {
            if (_context.rooms == null)
            {
                return NotFound();
            }

            var existingRoom = await _context.rooms.FindAsync(id);
            if (existingRoom == null)
            {
                return NotFound();
            }

            // Update fields
            existingRoom.RoomNo = roomDTO.RoomNo;
            existingRoom.HotelId = roomDTO.HotelId;
            existingRoom.RoomType = roomDTO.RoomType;
            existingRoom.PricePerNight = roomDTO.PricePerNight;
            existingRoom.City = roomDTO.City;
            existingRoom.Description = roomDTO.Description;
            existingRoom.Availability = roomDTO.Availability;

            // Handle image update if a new image is provided
            if (roomDTO.ImagesDto != null && roomDTO.ImagesDto.Length > 0)
            {
                string folder = Path.Combine(env.WebRootPath, "images");
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                string fileName = Guid.NewGuid().ToString() + "_" + roomDTO.ImagesDto.FileName;
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    roomDTO.ImagesDto.CopyTo(stream);
                }

                // Delete the old image file if it exists
                if (!string.IsNullOrEmpty(existingRoom.Images))
                {
                    string oldFilePath = Path.Combine(folder, existingRoom.Images);
                    if (System.IO.File.Exists(oldFilePath))
                    {
                        System.IO.File.Delete(oldFilePath);
                    }
                }

                existingRoom.Images = fileName; // Update image filename
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { status = "success", message = "Room updated successfully" });
        }

        // Helper method to check if room exists
        private bool RoomExists(int id)
        {
            return _context.rooms.Any(e => e.Id == id);
        }



        // DELETE api/<RoomController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            if (_context.rooms == null)
            {
                return NotFound();
            }

            var room = await _context.rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }

            // Delete the image file if it exists
            if (!string.IsNullOrEmpty(room.Images))
            {
                string folder = Path.Combine(env.WebRootPath, "images");
                string filePath = Path.Combine(folder, room.Images);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }

            _context.rooms.Remove(room);
            await _context.SaveChangesAsync();

            return Ok(new { status = "success", message = "Room deleted successfully" });
        }

    }
}
