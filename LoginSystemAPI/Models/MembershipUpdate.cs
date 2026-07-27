namespace LoginSystemAPI.Models
{
    public class MembershipUpdate
    {
        public string MembershipPlan { get; set; }

        public DateTime MembershipStartDate { get; set; }

        public DateTime MembershipExpiryDate { get; set; }

        public string MembershipStatus { get; set; }
    }
}
