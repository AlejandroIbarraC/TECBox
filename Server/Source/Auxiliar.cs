using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Configuration;

namespace Server.Source
{
    public class Auxiliar
    {
        /// <summary>
        /// Function in charge of receiving a date in string and separating it in a list of integers base on year, month and day
        /// </summary>
        /// <param name="date">
        /// String with the date to be separated
        /// </param>
        /// <returns>
        /// A list of integers organized in year, month and day
        /// </returns>
        public static int[] getDateInArray(string date)
        {
            int day = 0;
            int month = 0;
            int year = 0;
            string backslash = "-";
            int currentlyUsing = 2;
            int exp = 3;

            for (int i = 0; i < date.Length; i++)
            {
                if (date[i] == backslash[0])
                {
                    currentlyUsing -= 1;
                    exp = 1;                    
                }
                else
                {
                    if (currentlyUsing == 0)
                    {
                        int b = (int)Char.GetNumericValue(date[i]);
                        int a = (int)Math.Pow(10, exp);
                        day += (a * b);
                        exp -= 1;
                    }
                    else if (currentlyUsing == 1)
                    {
                        int b = (int)Char.GetNumericValue(date[i]);
                        int a = (int)Math.Pow(10, exp);
                        month += (a * b);
                        exp -= 1;
                    }
                    else
                    {
                        int b = (int)Char.GetNumericValue(date[i]);
                        int a = (int)Math.Pow(10, exp);
                        year += (a * b);
                        exp -= 1;
                    }
                }
            }

            int[] foundDate = { day, month, year };

            return foundDate;
        }

    }
}
