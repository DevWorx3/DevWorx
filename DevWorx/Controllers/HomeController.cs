using DevWorx.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace DevWorx.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public ActionResult SendEmail(string name, string number, string email, string message)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    MailMessage mm = new MailMessage(email, "DevWorx3@gmail.com");
                    mm.Subject = "Contact Request - "+ name;
                    mm.Body = CreateMessage(name,number,email,message);
                    mm.IsBodyHtml = false;
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "smtp.gmail.com";
                    smtp.Port = 587;
                    smtp.EnableSsl = true;

                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new System.Net.NetworkCredential("DevWorx3@gmail.com", "Lee@940724");
                    smtp.Send(mm);
                }

                return Json(new { message = labels.EmailSent, valid = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        public string CreateMessage(string name, string number, string email, string message)
        {
            string result = "";

            result = string.Format(labels.ContactMessage,name,number,email,message);

            return result;
        }
    }
}