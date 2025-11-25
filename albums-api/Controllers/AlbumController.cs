// AlbumController.cs
// ASP.NET Core controller for handling album API requests.

using albums_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace albums_api.Controllers
{
    /// <summary>
    /// Handles API requests for album data.
    /// </summary>
    [Route("albums")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        /// <summary>
        /// Returns all albums.
        /// GET /albums
        /// </summary>
        [HttpGet]
        public IActionResult Get()
        {
            var albums = Album.GetAll();
            return Ok(albums);
        }

        /// <summary>
        /// Returns a single album by ID.
        /// GET /albums/{id}
        /// </summary>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var albums = Album.GetAll();
            var album = albums.FirstOrDefault(a => a.Id == id);
            if (album == null)
            {
                return NotFound();
            }
            return Ok(album);
        }

        /// <summary>
        /// Returns albums sorted by price, name, or genre (artist).
        /// GET /albums/sort/{by}
        /// </summary>
        [HttpGet("sort/{by}")]
        public IActionResult Sort(string by)
        {
            var albums = Album.GetAll();
            List<Album> sorted;
            switch (by.ToLower())
            {
                case "price":
                    sorted = albums.OrderBy(a => a.Price).ToList();
                    break;
                case "name":
                    sorted = albums.OrderBy(a => a.Title).ToList();
                    break;
                case "genre":
                    // No genre property, so sort by Artist as a placeholder
                    sorted = albums.OrderBy(a => a.Artist).ToList();
                    break;
                default:
                    return BadRequest("Invalid sort key. Use 'price', 'name', or 'genre'.");
            }
            return Ok(sorted);
        }
    }
}
