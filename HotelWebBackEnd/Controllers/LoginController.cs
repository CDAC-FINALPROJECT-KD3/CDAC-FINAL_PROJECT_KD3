using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HotelWebBackEnd.DataBase;
using HotelWebBackEnd.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HotelWebBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        //MyDbContext db = new MyDbContext();
        private MyDbContext db;
        private readonly IConfiguration configuration;
        public LoginController(MyDbContext myDbContext, IConfiguration configuration)
        {
            db = myDbContext;
            this.configuration = configuration;
        }

        // POST api/<LoginController>
        [HttpPost]
        public IActionResult Post([FromBody] Login loginData)
        {
            User user = db.users.FirstOrDefault(x => x.Email == loginData.Email && x.Password == loginData.Password);
            if (user != null)
            {
                var Claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub,configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                    new Claim("UserId",user.Id.ToString()),
                    new Claim("Email",user.Email.ToString())
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                var signIn=new SigningCredentials(key,SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    configuration["Jwt:Issuer"],
                    configuration["Jwt:Audience"],
                    Claims,
                    expires: DateTime.UtcNow.AddMinutes(60),
                    signingCredentials: signIn
                    );
                string tokenValue=new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new {Token=tokenValue,User=user});
                //return Ok(user);
            }
            return NoContent();
        }

        // PUT api/<LoginController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LoginController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
