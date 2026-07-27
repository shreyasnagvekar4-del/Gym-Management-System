namespace LoginSystemAPI.Models
{
    public class AttendanceResponse
    {
        public int UserId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string? Profileimage { get; set; }

        public string CheckInTime { get; set; }
    }
}