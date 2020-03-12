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
    [Route("client/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public List<Users> getUsers()
        {
            List<Users> usersList = new List<Users>();
            string fileName = "DataBase/users.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            usersList = JsonSerializer.Deserialize<List<Users>>(jsonString);

            /*Users user1 = new Users("Kevin", 999, "kevin@hola.com", "1234", 88888888, "San Rafael", "Alajuela", "San Ramon");
            Users user2 = new Users("Ale", 941, "ale@hola.com", "1234", 99999999, "Grecia", "Alajuela", "Grecia");
            Users user3 = new Users("Jesus", 124, "jesus@hola.com", "1234", 77777777, "Orotina", "Alajuela", "Orotina");
            Users user4 = new Users("Jose", 654, "jose@hola.com", "1234", 5555555, "La Garita", "Alajuela", "Alajuela");

            usersList.Add(user1);
            usersList.Add(user2);
            usersList.Add(user3);
            usersList.Add(user4);
            
            string jsonString = JsonSerializer.Serialize(usersList);
            System.IO.File.WriteAllText(fileName, jsonString);*/

            return usersList;
        }

        [Route("insert")]
        [HttpPost]
        public void insertPost([FromBody] Users users)
        {
            Debug.WriteLine("Cliente insertado");
        }

        [Route("modify")]
        [HttpPost]
        public void modifyPost([FromBody] Users users)
        {
            Debug.WriteLine("Cliente modificado");
        }

        [Route("delete")]
        [HttpPost]
        public void deletePost([FromBody] Users users)
        {
            Debug.WriteLine("Cliente eliminado");
        }
    }
}
