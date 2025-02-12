using HotelWebBackEnd.DataBase;
using HotelWebBackEnd.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HotelWebBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpController : ControllerBase
    {
        //MyDbContext db = new MyDbContext();
        private MyDbContext db;
        public EmpController(MyDbContext myDbContext)
        {
            db = myDbContext;
        }

        // GET: api/<EmpsController>
        [HttpGet]
        public IEnumerable<Emp> Get()
        {
            return (db.emps.ToList());
        }


        // GET api/<EmpController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<EmpController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<EmpController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<EmpController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
