using BookNest.Book.WebApi.Data;
using BookNest.Models;
using Microsoft.AspNetCore.Mvc;
namespace BookNest.Book.WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController(AppDbContext db) : ControllerBase
    {
        private readonly AppDbContext _db = db;

        [HttpGet]
        public object Get()
        {
           IEnumerable<Product> products = _db.Products.ToList();
            return products;
        }
        [HttpGet("id/{id}")]
        public Product? GetById(int id)
        {
            Product? product = _db.Products.Where(x => x.Id == id).FirstOrDefault();
            return product;
        }

        [HttpGet("featured")]
        public IEnumerable<Product> GetFeaturedBooks()
        {
            return _db.Products
                .Join(
                    _db.FeaturedProducts,
                    product => product.Id,
                    featured => featured.ProductId,
                    (product, _) => product)
                .ToList();
        }
    }
}
