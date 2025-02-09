import nodemailer from 'nodemailer';
import ejs from 'ejs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Utilitaire pour obtenir __dirname dans ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const emailSenderWithNoData = async (emailReceiver, filename) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: "rakotoarisoatahiry87@gmail.com",
      pass: "fcww uveh lwrt gyqt",
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.log('Erreur de configuration Nodemailer:', error);
    } else {
      console.log('Le serveur est prêt à prendre nos messages');
    }
  });

  try {
    const templatePath = path.join(__dirname, 'EmailTemplate', `${filename}.ejs`);
    const templateContent = await fs.readFile(templatePath, 'utf8');
    console.log('Template EJS loaded');

    const renderedTemplate = ejs.render(templateContent);
    console.log('Template EJS rendered');

    const mailOptions = {
      from: `"Centre de contrôle Réservation" <rakotoarisoatahiry87@gmail.com>`,
      to: emailReceiver,
      subject: 'Nouveau rendez-vous',
      html: renderedTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
      } else {
        console.log('Email envoyé: ' + info.response);
      }
    });

  } catch (error) {
    console.error('Erreur lors de la lecture du modèle EJS:', error);
  }
};

export default emailSenderWithNoData;
