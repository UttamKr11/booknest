using Microsoft.EntityFrameworkCore;
using ProductEntity = BookNest.Models.Product;

namespace BookNest.Book.WebApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<ProductEntity> Products => Set<ProductEntity>();
    public DbSet<BookNest.Models.FeaturedProduct> FeaturedProducts => Set<BookNest.Models.FeaturedProduct>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ProductEntity>(entity =>
        {
            entity.ToTable("products", "dbo");
            entity.HasKey(product => product.Id);
            entity.Property(product => product.Name).HasMaxLength(255);
            entity.Property(product => product.Poster).HasMaxLength(1024);
            entity.Property(product => product.ImageLocal).HasMaxLength(255);
            entity.Property(product => product.Price).HasPrecision(10, 2);
            entity.Property(product => product.Rating).HasColumnType("tinyint");

            entity.ToTable(table => table.HasCheckConstraint(
                "chk_products_rating",
                "rating BETWEEN 1 AND 5"));
        });

        modelBuilder.Entity<BookNest.Models.FeaturedProduct>(entity =>
        {
            entity.ToTable("featured_products", "dbo");
            entity.HasKey(featured => featured.ProductId);
            entity.HasOne(featured => featured.Product)
                .WithOne()
                .HasForeignKey<BookNest.Models.FeaturedProduct>(featured => featured.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
