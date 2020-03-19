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
            string backslash = "/";
            int currentlyUsing = 0;
            int exp = 0;

            for (int i = 0; i < date.Length; i++)
            {
                if (date[i] == backslash[0])
                {
                    currentlyUsing += 1;
                    exp = 0;
                }
                else
                {
                    if (currentlyUsing == 0)
                    {
                        int b = (int)Char.GetNumericValue(date[i]);
                        int a = (int)Math.Pow(10, exp);
                        day += (a * b);
                        exp += 1;
                    }
                    else if (currentlyUsing == 1)
                    {
                        int b = (int)Char.GetNumericValue(date[i]);
                        int a = (int)Math.Pow(10, exp);
                        month += (a * b);
                        exp += 1;
                    }
                    else
                    {
                        int b = (int)Char.GetNumericValue(date[i]);
                        int a = (int)Math.Pow(10, exp);
                        year += (a * b);
                        exp += 1;
                    }
                }
            }

            if (day > 9)
            {
                int d1 = day % 10;
                int d2 = (day / 10) % 10;
                day = int.Parse(string.Concat(d1, d2));
            }
            if (month > 9)
            {
                int m1 = month % 10;
                int m2 = (month / 10) % 10;
                month = int.Parse(string.Concat(m1, m2));
            }

            int y1 = year % 10;
            int y2 = (year / 10) % 10;
            int y3 = (year / 100) % 10;
            int y4 = (year / 1000) % 10;
            year = int.Parse(string.Concat(y1, y2, y3, y4));

            int[] foundDate = { day, month, year };

            return foundDate;
        }

    }
}
