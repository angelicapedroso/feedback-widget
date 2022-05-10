import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bc9a83a944d8a3",
    pass: "f1bfbceefbdd8b"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
  await transport.sendMail({
    from: 'Equipe Feedback Widget <oi@feedbackwidget.com>',
    to: 'Angelica Pedroso <angelicapedroso05@gmail.com>',
    subject,
    html: body,
  });
  };
}