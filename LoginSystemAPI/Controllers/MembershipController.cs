using LoginSystemAPI.Data;
using LoginSystemAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace LoginSystemAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembershipController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MembershipController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Membership
        [HttpGet]
        public IActionResult GetMembershipPlans()
        {
            var plans = _context.MembershipPlans.ToList();

            return Ok(plans);
        }

        [HttpGet("{id}")]
        public IActionResult GetMembershipPlanById(int id)
        {
            var plan = _context.MembershipPlans.FirstOrDefault(p => p.Id == id);

            if (plan == null)
                return NotFound();

            return Ok(plan);
        }

        // PUT: api/Membership/1
        [HttpPut("{id}")]
        public IActionResult UpdateMembershipPlan(int id, MembershipPlan updatedPlan)
        {
            var plan = _context.MembershipPlans.FirstOrDefault(p => p.Id == id);

            if (plan == null)
                return NotFound();

            plan.PlanName = updatedPlan.PlanName;
            plan.DurationMonths = updatedPlan.DurationMonths;
            plan.Price = updatedPlan.Price;
            plan.Description = updatedPlan.Description;

            _context.SaveChanges();

            return Ok("Membership plan updated successfully");
        }
    }
}