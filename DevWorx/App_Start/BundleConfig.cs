using System.Web;
using System.Web.Optimization;

namespace DevWorx
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {            
                bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                      "~/Scripts/global.js",
                            "~/Scripts/jquery-{version}.js"));


                bundles.Add(new ScriptBundle("~/bundles/js").Include(
                      //"~/Content/js/bootstrap.min.js",
                      "~/Content/js/purecounter.min.js",
                      "~/Content/js/swiper.min.js",
                      "~/Content/js/aos.js",
                      "~/Content/js/script.js",
                      "~/Content/vendor/swiper/swiper-bundle.min.js",
                      "~/Content/vendor/aos/aos.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                 "~/Content/css/bootstrap.min.css",
                 "~/Content/css/fontawesome-all.min.css",
                 "~/Content/css/aos.min.css",
                 "~/Content/css/swiper.css", 
                 "~/Content/css/js-composer.css",
                 "~/Content/vendor/swiper/swiper-bundle.min.css",
                 "~/Content/css/style.css"));

        }
    }
}
