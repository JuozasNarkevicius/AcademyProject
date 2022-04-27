using DinkToPdf;
using DinkToPdf.Contracts;
using Domain.Entities;
using WebAPI.Utility;

namespace WebAPI.Services
{
    public interface IPdfCreator
    {
        public byte[] CreatePdf(WorkoutProgram program, IConverter converter);
    }
    public class PdfCreator : IPdfCreator
    {
        public byte[] CreatePdf(WorkoutProgram program, IConverter converter)
        {

            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 5 },
                DocumentTitle = "PDF Report",
            };
            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = TemplateGenerator.GetHTMLString(program),
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "styles.css") },
                //HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                //FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
            };
            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };

            converter.Convert(pdf);
            var pdfFile = converter.Convert(pdf);

            return pdfFile;
        }
    }
}
