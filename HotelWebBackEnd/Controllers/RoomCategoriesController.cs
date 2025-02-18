using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HotelWebBackEnd.DataBase;
using HotelWebBackEnd.Model;

namespace HotelWebBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RoomCategoriesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public RoomCategoriesController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/RoomCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomCategory>>> GetroomCategory()
        {
          if (_context.roomCategory == null)
          {
              return NotFound();
          }
            return await _context.roomCategory.ToListAsync();
        }

        // GET: api/RoomCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoomCategory>> GetRoomCategory(int id)
        {
          if (_context.roomCategory == null)
          {
              return NotFound();
          }
            var roomCategory = await _context.roomCategory.FindAsync(id);

            if (roomCategory == null)
            {
                return NotFound();
            }

            return roomCategory;
        }

        // PUT: api/RoomCategories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoomCategory(int id, RoomCategory roomCategory)
        {
            if (id != roomCategory.Id)
            {
                return BadRequest();
            }

            _context.Entry(roomCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomCategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RoomCategories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RoomCategory>> PostRoomCategory(RoomCategory roomCategory)
        {
          if (_context.roomCategory == null)
          {
              return Problem("Entity set 'MyDbContext.roomCategory'  is null.");
          }
            _context.roomCategory.Add(roomCategory);
            await _context.SaveChangesAsync();

            return Ok(new { status = "success" });
        }

        // DELETE: api/RoomCategories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomCategory(int id)
        {
            if (_context.roomCategory == null)
            {
                return NotFound();
            }
            var roomCategory = await _context.roomCategory.FindAsync(id);
            if (roomCategory == null)
            {
                return NotFound();
            }

            _context.roomCategory.Remove(roomCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoomCategoryExists(int id)
        {
            return (_context.roomCategory?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
