import { prisma } from './prisma';
import express from 'express';
import nodemailer from 'nodemailer';

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bc9a83a944d8a3",
    pass: "f1bfbceefbdd8b"
  }
});

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type, 
      comment,
      screenshot,
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedback Widget <oi@feedbackwidget.com>',
    to: 'Angelica Pedroso <angelicapedroso05@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join('\n')
  });

  return res.status(201).json({ data: feedback });
})
