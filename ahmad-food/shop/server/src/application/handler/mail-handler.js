class MailHandler {
  constructor(mailer, config) {
    this.mailTransporter = mailer.createTransport(config.mailer);
  }

  sendConfirmationLink(user, token) {
    if (Number.isNaN(Number.parseInt(user.username))) return this.sendConfirmationByEmail(user, token);
    return this.sendConfirmationBySMS(user, token);
  }

  sendConfirmationByEmail(user, token) {
    console.log("User: ", user);
    const mailOptions = {
      from: '"LetsDoHobby" <contact@kawaraa.com>', // sender address
      to: "", // list of receivers
      subject: "LetsDoHobby account confirmation", // Subject line
      html: "", // html body
    };
    const url = (process.env.ORIGIN || "http://localhost:8080") + "/api/confirm/" + token;
    mailOptions.html = `<a href="${url}" id="k-logo">Click here to confirm your LetsDoHobby account</a>`;
    mailOptions.to = user.username;

    return new Promise((resolve, reject) => {
      const cb = (error, info) => (error ? reject(error) : resolve(info));
      this.mailTransporter.sendMail(mailOptions, cb);
    });
  }
}

module.exports = MailHandler;
