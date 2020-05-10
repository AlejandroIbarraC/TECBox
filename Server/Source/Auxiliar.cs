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
