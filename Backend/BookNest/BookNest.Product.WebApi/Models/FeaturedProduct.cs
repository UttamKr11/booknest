using BookNest.Models;
using System.ComponentModel.DataAnnotations;

namespace BookNest.Models;

public class FeaturedProduct
{
    [Key]
    public int ProductId { get; set; }

    public Product Product { get; set; } = null!;
}
