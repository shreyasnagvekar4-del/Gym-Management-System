namespace LoginSystemAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PasswordHash { get; set; }

        public int? Age { get; set; }

        public string? Gender { get; set; }

        public string? Address { get; set; }

        public string? Profileimage { get; set; }

        public string? MembershipPlan { get; set; }

        public DateTime? MembershipStartDate { get; set; }

        public DateTime? MembershipExpiryDate { get; set; }

        public string? MembershipStatus { get; set; }

        public string Role { get; set; } = "Member";
    }
}
