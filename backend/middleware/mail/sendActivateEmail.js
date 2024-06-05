const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));
 


 // Send activation email with styles
exports.sendActivateEmail = async (newUser,activationToken) => {
    const activationLink = `http://localhost:3000/activate/${activationToken}`;
    transporter.sendMail({
        from: 'generalzn1@gmail.com',   // Sender's email address
        to: newUser.email,              // Receiver's email address
        subject: 'Activate your account',  // Email subject
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h1 style="color: #4CAF50;">Welcome to our service!</h1>
                <p>Dear ${newUser.name},</p>
                <p>Thank you for registering. To complete your registration, please click the link below to activate your account:</p>
                <a href="${activationLink}" style="display: inline-block; margin: 10px 0; padding: 10px 20px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Activate your account</a>
                <p>If you did not sign up for this account, you can ignore this email.</p>
                <p>Best regards,<br>Your Company Name</p>
            </div>
        `  // HTML content of the email with inline styles
    });
} 