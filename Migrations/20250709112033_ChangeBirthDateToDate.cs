using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace practice.Migrations
{
    /// <inheritdoc />
    public partial class ChangeBirthDateToDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "BirthDate",
                table: "Birthdays",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "BirthDate",
                table: "Birthdays",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date");
        }

    }
}
