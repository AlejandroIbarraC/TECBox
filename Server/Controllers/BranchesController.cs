using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source;

namespace Server.Controllers
{
    [Route("administrator/[controller]")]
    [ApiController]
    public class BranchesController : ControllerBase
    {
        [HttpGet]
        public List<Branches> getBranches()
        {
            List<Branches> branchesList = new List<Branches>();
            string fileName = "DataBase/branches.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            branchesList = JsonSerializer.Deserialize<List<Branches>>(jsonString);

            /***Branches branch1 = new Branches("Monge", "500 m sur de la Basilica", "Cartago", 12345678, "Jose", "Cartago");
            Branches branch2 = new Branches("Gollo", "200 m sur de la Fiesta del Maiz, residencial el Bosque", "Alajuela", 87654321, "Ale", "La Garita");
            Branches branch3 = new Branches("El Verdugo", "250 m norte del TEC", "Cartago", 132435678, "Jesus", "Cartago");
            Branches branch4 = new Branches("Artelec", "100 m norte de la casa de Ale", "Alejuela", 90909090, "Kevin", "Grecia");

            rolesList.Add(branch1);
            rolesList.Add(branch2);
            rolesList.Add(branch3);
            rolesList.Add(branch4);

            string jsonString = JsonSerializer.Serialize(rolesList);
            System.IO.File.WriteAllText(fileName, jsonString);***/

            return branchesList;
        }

        [Route("insert")]
        [HttpPost]
        public void insertPost([FromBody] Branches branches)
        {
            Debug.WriteLine("Sucursal insertada");
        }

        [Route("modify")]
        [HttpPost]
        public void modifyPost([FromBody] Branches branches)
        {
            Debug.WriteLine("Sucursal modificada");
        }

        [Route("delete")]
        [HttpPost]
        public void deletePost([FromBody] Branches branches)
        {
            Debug.WriteLine("Sucursal eliminada");
        }
    }
}
