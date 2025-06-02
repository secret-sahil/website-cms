import nodemailer from 'nodemailer';
import config from 'config';
import path from 'path';
import fs from 'fs/promises';
import handlebars from 'handlebars';
import juice from 'juice';
import Mail from 'nodemailer/lib/mailer';

const smtp = config.get<{
  service: string;
  user: string;
  pass: string;
}>('smtp');

const appName = config.get<string>('appName');

interface EmailTemplate {
  template: string;
  subject: string;
}

export default class Email {
  #to: string;
  #from: string;
  #replyTo: string;
  #context?: Record<string, any>;
  constructor(
    private user: {
      email: string;
      context?: Record<string, any>;
    },
  ) {
    this.#context = user.context;
    this.#to = user.email;
    this.#from = `${appName} <${smtp.user}>`;
    this.#replyTo = `${appName} <${smtp.user}>`;
  }

  private newTransport() {
    return nodemailer.createTransport({
      ...smtp,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  private async send({ template, subject }: EmailTemplate) {
    try {
      const templatePath = path.join(`${__dirname}/../../views/${template}.hbs`);
      const rawHtml = await fs.readFile(templatePath, 'utf8');
      const compiledTemplate = handlebars.compile(rawHtml);
      const htmlWithData = compiledTemplate(this.#context);
      const html = juice(htmlWithData);

      const mailOptions: Mail.Options = {
        from: this.#from,
        replyTo: this.#replyTo,
        to: this.#to,
        subject,
        html,
      };

      await this.newTransport().sendMail(mailOptions);
    } catch (error) {
      console.error('Error during send mail :', error);
    }
  }

  async sendLeadFormResponseMail() {
    await this.send({
      template: 'leadFormResponse',
      subject: 'Thank You for Reaching Out to Infutrix!',
    });
  }

  async sendjobApplicationMail() {
    await this.send({
      template: 'jobApplicationSubmit',
      subject: 'Application Received – Thanks for Applying at Infutrix!',
    });
  }
}
