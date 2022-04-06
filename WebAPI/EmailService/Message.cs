using Microsoft.AspNetCore.Http;
using MimeKit;

namespace EmailService
{
    public class Message
    {
        public MailboxAddress To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public IFormFile Attachment { get; set; }
        public Message(string to, string subject, string content, IFormFile attachment)
        {
            To = new MailboxAddress(to, to);
            Subject = subject;
            Content = content;
            Attachment = attachment;
        }
    }
}
