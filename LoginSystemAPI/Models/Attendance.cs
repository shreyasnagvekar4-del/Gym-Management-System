namespace LoginSystemAPI.Models
{
    public class Attendance
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateOnly AttendanceDate { get; set; }

        public TimeOnly CheckInTime { get; set; }
    }
}