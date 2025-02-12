using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelWebBackEnd.Model
{
    [Table("Employee")]
    public class Emp
    {
        [Key]
        //[Column ("Id",TypeName = "int")]
        public int Id { get; set; }
        //[Column("Name", TypeName = "varchar")]
        //[StringLength (50)]
        public string Name { get; set; }
        //[Column("Address", TypeName = "varchar")]
        //[StringLength (50)]
        public string Address { get; set; }
    }
}
