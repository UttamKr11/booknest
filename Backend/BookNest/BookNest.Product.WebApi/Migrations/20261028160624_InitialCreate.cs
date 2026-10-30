using System.Reflection;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookNest.Book.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "products",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Overview = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LongDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    Poster = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: false),
                    ImageLocal = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Rating = table.Column<byte>(type: "tinyint", nullable: false),
                    InStock = table.Column<bool>(type: "bit", nullable: false),
                    Size = table.Column<int>(type: "int", nullable: false),
                    BestSeller = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.Id);
                    table.CheckConstraint("chk_products_rating", "rating BETWEEN 1 AND 5");
                });

            migrationBuilder.CreateTable(
                name: "featured_products",
                schema: "dbo",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_featured_products", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_featured_products_products_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "dbo",
                        principalTable: "products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.Sql(ReadEmbeddedSql("SeedProducts.sql"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "featured_products",
                schema: "dbo");

            migrationBuilder.DeleteData(
                table: "featured_products",
                schema: "dbo",
                keyColumn: "ProductId",
                keyValues: new object[] { 10004, 10006, 10008 });

            migrationBuilder.Sql(
                "DELETE FROM [dbo].[products] WHERE [Id] BETWEEN 10001 AND 10015;");

            migrationBuilder.DropTable(
                name: "products",
                schema: "dbo");
        }

        private static string ReadEmbeddedSql(string fileName)
        {
            var assembly = typeof(InitialCreate).Assembly;
            var resourceName = assembly.GetManifestResourceNames()
                .Single(name => name.EndsWith($".Migrations.Scripts.{fileName}", StringComparison.Ordinal));

            using var stream = assembly.GetManifestResourceStream(resourceName)!;
            using var reader = new StreamReader(stream);
            return reader.ReadToEnd();
        }
    }
}
