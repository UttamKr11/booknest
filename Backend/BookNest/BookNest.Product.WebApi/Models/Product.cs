using System.ComponentModel.DataAnnotations;

namespace BookNest.Models;

public class Product
{
    [Key]
    public int Id { get; set; }

    public required string Name { get; set; }

    public required string Overview { get; set; }

    public required string LongDescription { get; set; }

    public decimal Price { get; set; }

    public required string Poster { get; set; }

    public required string ImageLocal { get; set; }

    public byte Rating { get; set; }

    public bool InStock { get; set; }

    public int Size { get; set; }

    public bool BestSeller { get; set; }
}
