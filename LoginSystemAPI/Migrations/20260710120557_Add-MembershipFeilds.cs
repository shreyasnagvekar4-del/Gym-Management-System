    using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LoginSystemAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddMembershipFeilds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.AddColumn<DateTime>(
                name: "MembershipExpiryDate",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MembershipPlan",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "MembershipStartDate",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MembershipStatus",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.DropColumn(
                name: "MembershipExpiryDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MembershipPlan",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MembershipStartDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MembershipStatus",
                table: "Users");

           
        }
    }
}
