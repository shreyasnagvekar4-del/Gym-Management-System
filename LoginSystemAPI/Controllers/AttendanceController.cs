using LoginSystemAPI.Data;
using LoginSystemAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace LoginSystemAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AttendanceController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult MarkAttendance([FromBody] Attendance attendance)
        {
            // Check if attendance is already marked today
            var alreadyMarked = _context.Attendances.FirstOrDefault(a =>
                a.UserId == attendance.UserId &&
                a.AttendanceDate == attendance.AttendanceDate);

            if (alreadyMarked != null)
            {
                return BadRequest(new
                {
                    message = "Attendance already marked for today."
                });
            }

            _context.Attendances.Add(attendance);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Attendance marked successfully."
            });
        }

        [HttpGet("user/{id}")]
        public IActionResult GetAttendanceByUser(int id)
        {
            var attendance = _context.Attendances
                .Where(a => a.UserId == id)
                .OrderByDescending(a => a.AttendanceDate)
                .ToList();

            return Ok(attendance);
        }

        [HttpGet("month/{id}")]
        public IActionResult GetMonthlyAttendance(int id, int month, int year)
        {
            var attendance = _context.Attendances
                .Where(a =>
                    a.UserId == id &&
                    a.AttendanceDate.Month == month &&
                    a.AttendanceDate.Year == year)
                .OrderBy(a => a.AttendanceDate)
                .Select(a => new
                {
                    AttendanceDate = a.AttendanceDate,
                    CheckInTime = DateTime.Today
                        .Add(a.CheckInTime.ToTimeSpan())
                        .ToString("hh:mm tt")
                })
                .ToList();

            return Ok(attendance);
        }

        [HttpGet("date")]
        public IActionResult GetAttendanceByDate(DateOnly date)
        {
            var attendance = (from a in _context.Attendances
                              join u in _context.Users
                              on a.UserId equals u.Id
                              where a.AttendanceDate == date
                              orderby a.CheckInTime
                              select new AttendanceResponse
                              {
                                  UserId = u.Id,
                                  Name = u.Name,
                                  Email = u.Email,
                                  Profileimage = u.Profileimage,

                                  // Add it here
                                  CheckInTime = DateTime.Today
                                      .Add(a.CheckInTime.ToTimeSpan())
                                      .ToString("hh:mm tt")
                              }).ToList();

            return Ok(attendance);
        }
    }
}