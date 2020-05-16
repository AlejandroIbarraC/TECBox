using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source;

namespace Server.Controllers
{
    [Route("client/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        /// <summary>
        /// Function in charge of recopilating all the users in the database
        /// </summary>
        /// <returns>
        /// A JSON with the list of users in the database
        /// </returns>
        [EnableCors("AnotherPolicy")]
        [HttpGet]
        public List<Users> getUsers()
        {
            List<Users> usersList = new List<Users>();
            string fileName = "DataBase/users.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            usersList = JsonSerializer.Deserialize<List<Users>>(jsonString);

            return usersList;
        }

        /// <summary>
        /// Function in charge of finding a user by it's email and password
        /// </summary>
        /// <param name="searchUser">
        /// User with the email and password to be found
        /// </param>
        /// <returns>
        /// A JSON with the found user
        /// </returns>
        [Route("information")]
        [EnableCors("AnotherPolicy")]
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
                if (usersList[i].eMail == searchUser.eMail && usersList[i].password == searchUser.password)
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
                user = new Users("null", "null", "null", "null", "null", "null", "null", "null");
                return user;
            }
        }

        /// <summary>
        /// Function in charge of inserting a user in the database
        /// </summary>
        /// <param name="user">
        /// User to be added
        /// </param>
        [Route("insert")]
        [EnableCors("AnotherPolicy")]
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

        /// <summary>
        /// Function in charge of modifying a user in the database
        /// </summary>
        /// <param name="user">
        /// User to be modified
        /// </param>
        [Route("modify")]
        [EnableCors("AnotherPolicy")]
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

        /// <summary>
        /// Function in charge of deleting a user in the database
        /// </summary>
        /// <param name="user">
        /// User to be deleted
        /// </param>
        [Route("delete")]
        [EnableCors("AnotherPolicy")]
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
