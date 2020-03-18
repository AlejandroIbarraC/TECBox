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

            return usersList;
        }


        [Route("information")]
        [HttpPost]
        public Users getUserInformation([FromBody] Users searchUser)
        {
            List<Users> usersList = new List<Users>();
            string fileName = "DataBase/users.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            usersList = JsonSerializer.Deserialize<List<Users>>(jsonString);

            Users user = null;
            for (int i = 0; i < usersList.Count; i++)
            {
                if (usersList[i].eMail == searchUser.eMail)
                {
                    user = usersList[i];
                }
            }
            if (user != null)
            {
                return user;
            }
            else
            {
                user = new Users("null", -1, "null", "null", -1, "null", "null", "null");
                return user;
            }
        }

        [Route("insert")]
        [HttpPost]
        public void insertPost([FromBody] Users user)
        {
            List<Users> usersList = new List<Users>();
            string fileName = "DataBase/users.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            usersList = JsonSerializer.Deserialize<List<Users>>(jsonString);

            bool validation = true;

            for (int i = 0; i < usersList.Count; i++)
            {
                if (usersList[i].idNumber == user.idNumber)
                {
                    validation = false;
                    break;
                }
            }

            if (validation)
            {
                usersList.Add(user);

                jsonString = JsonSerializer.Serialize(usersList);
                System.IO.File.WriteAllText(fileName, jsonString);

                Debug.WriteLine("User inserted");
            }
            else
            {
                Debug.WriteLine("User has a duplicate id");
            }
        }

        [Route("modify")]
        [HttpPost]
        public void modifyPost([FromBody] Users user)
        {
            List<Users> usersList = new List<Users>();
            string fileName = "DataBase/users.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            usersList = JsonSerializer.Deserialize<List<Users>>(jsonString);

            bool validation = false;

            for (int i = 0; i < usersList.Count; i++)
            {
                if (usersList[i].idNumber == user.idNumber)
                {
                    usersList[i] = user;
                    Debug.WriteLine("User modified");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(usersList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("User not found");
            }
        }

        [Route("delete")]
        [HttpPost]
        public void deletePost([FromBody] Users user)
        {
            List<Users> usersList = new List<Users>();
            string fileName = "DataBase/users.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            usersList = JsonSerializer.Deserialize<List<Users>>(jsonString);

            bool validation = false;

            for (int i = 0; i < usersList.Count; i++)
            {
                if (usersList[i].idNumber == user.idNumber)
                {
                    usersList.RemoveAt(i);
                    Debug.WriteLine("User deleted");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(usersList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("User not found");
            }
        }
    }
}
