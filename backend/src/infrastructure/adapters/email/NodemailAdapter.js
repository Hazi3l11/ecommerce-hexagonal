const nodemailer = require('nodemailer');
const EmailServicePort = require('../../../application/ports/EmailServicePort');

const {
  plantillaComprobante,
  plantillaAdministrador,
} = require('./emailTemplates');


class NodemailAdapter extends EmailServicePort {
  constructor() {
    super();

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 2525),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    this.from = process.env.EMAIL_FROM;
    this.adminEmail = process.env.ADMIN_EMAIL;
  }

  async enviarComprobanteCompra({
    usuario,
    pedido,
    items,
    total,
  }) {
    return this.transporter.sendMail({
      from: this.from,
      to: usuario.email,
      subject: `Confirmación de pedido #${pedido.id.slice(0, 8)}`,
      html: plantillaComprobante({
        usuario,
        pedido,
        items,
        total,
      }),
    });
  }

  async notificarAdministrador({
    usuario,
    pedido,
    items,
    total,
  }) {
    return this.transporter.sendMail({
      from: this.from,
      to: this.adminEmail,
      subject: `Nuevo pedido #${pedido.id.slice(0, 8)}`,
      html: plantillaAdministrador({
        usuario,
        pedido,
        items,
        total,
      }),
    });
  }
}

module.exports = NodemailAdapter;