using LoginSystemAPI.Data;
using LoginSystemAPI.Models;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace LoginSystemAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _context.Users.ToList();

            return Ok(users);
        }

        [HttpPost]
        public IActionResult CreateUser(User user)
        {
            user.Email = user.Email.Trim().ToLower();
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return BadRequest("Email already Registered ");
            }

            if (_context.Users.Any(u => u.Phone == user.Phone))
            {
                return BadRequest("Number already Registered");
            }

            user.Role = "Member";

            user.PasswordHash =
                BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(new
            {
                name = user.Name,
                email = user.Email
            });
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            var email = request.Email.Trim().ToLower();
            var user = _context.Users.FirstOrDefault(
                u => u.Email == email
            );

            if (user == null)
            {
                return BadRequest("User not found");
            }

            bool valid =
                BCrypt.Net.BCrypt.Verify(
                    request.Password,
                    user.PasswordHash
                    );

            if (!valid)
            {
                return BadRequest("Incorrect password");
            }

            return Ok(new
            {
                id = user.Id,
                name = user.Name
                , email = user.Email,
                role = user.Role
            });
        }

        [HttpGet("{email}")]
        public IActionResult GetUser(string email)
        {
            email = email.Trim().ToLower();
            var user = _context.Users.FirstOrDefault(  u => u.Email == email);
            if (user == null)
                return NotFound();

            if (user.MembershipExpiryDate.HasValue && user.MembershipExpiryDate < DateTime.Today &&  user.MembershipStatus == "Active")
            {
                user.MembershipStatus = "Expired";
                _context.SaveChanges();
            }
            return Ok(user);
        }

        [HttpPut("{email}")]
        public IActionResult UpdateUser(string email, updatedUser1 updatedUser)
        {
            email = email.Trim().ToLower();

            var user = _context.Users.FirstOrDefault(u => u.Email == email);

            if (user == null)
                return NotFound();

            user.Name = updatedUser.Name;
            user.Age = updatedUser.Age;
            user.Gender = updatedUser.Gender;
            user.Address = updatedUser.Address;

            _context.SaveChanges();

            return Ok(user);
        }

        [HttpPost("upload/{email}")]
        public async Task<IActionResult> UploadImage(string email, IFormFile image)
        {
            Console.WriteLine("Upload endpoint hit");
            if (image == null || image.Length == 0)
                return BadRequest("No image selected.");

            email =email.Trim().ToLower();
            var user = _context.Users.FirstOrDefault(u => u.Email == email);

            if (user == null||image.Length==0)
                return NotFound("User not found");
            string extension=Path.GetExtension(image.FileName);

            string fileName = user.Id + extension;

            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "profileimages", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create)) { 
                await image.CopyToAsync(stream);
            }
            user.Profileimage = fileName;
            _context.SaveChanges();

       
            return Ok(fileName);
        }

        [HttpPut("membership/{email}")]
        public IActionResult UpdateMembership(string email, MembershipUpdate membership)
        {
            email = email.Trim().ToLower();

            var user = _context.Users.FirstOrDefault(u => u.Email == email);

            if (user == null)
                return NotFound();

            user.MembershipPlan = membership.MembershipPlan;
            user.MembershipStartDate = membership.MembershipStartDate;
            user.MembershipExpiryDate = membership.MembershipExpiryDate;
            user.MembershipStatus = membership.MembershipStatus;

            _context.SaveChanges();

            return Ok("Membership Activated");
        }

        [HttpGet("id/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                return NotFound();

            if (user.MembershipExpiryDate.HasValue &&
                user.MembershipExpiryDate < DateTime.Today &&
                user.MembershipStatus == "Active")
            {
                user.MembershipStatus = "Expired";
                _context.SaveChanges();
            }

            return Ok(user);
        }

        [HttpPut("id/{id}")]
        public IActionResult UpdateUserById(int id, updatedUser1 updatedUser)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                return NotFound();

            user.Name = updatedUser.Name;
            user.Phone = updatedUser.Phone;
            user.Age = updatedUser.Age;
            user.Gender = updatedUser.Gender;
            user.Address = updatedUser.Address;
            user.MembershipPlan = updatedUser.MembershipPlan;
            user.MembershipStatus = updatedUser.MembershipStatus;

            _context.SaveChanges();

            return Ok("Member updated successfully");
        }
    }
}