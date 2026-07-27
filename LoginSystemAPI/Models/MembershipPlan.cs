namespace LoginSystemAPI.Models
{
    public class MembershipPlan
    {
        public int Id { get; set; }

        public string PlanName { get; set; }

        public int DurationMonths { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }
    }
}
