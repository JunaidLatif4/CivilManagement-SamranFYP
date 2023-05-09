const nodemailer = require('nodemailer');
const VerifyEmailTemplate = require("./templates/VerifyEmail");
require('dotenv').config();


const SendEmail = async (email, projectDetails, next) => {

    try {


        mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                // user: process.env.EMAIL,
                user: "fyp2019to2023@gmail.com",
                // pass: process.env.PASS,
                pass: "fyp@2019B",
            }
        });

        mailDetails = {
            // from: 'mailsender193@gmail.com',
            from: process.env.EMAIL,
            to: email,
            subject: 'Project Invitation',
            html: VerifyEmailTemplate(projectDetails)
        };

        let res = await mailTransporter.sendMail(mailDetails)
        console.log("Email Response -----> ", res)

    } catch (err) {
        console.log("Email ERROR -----> ", err)
    }

}

module.exports = SendEmail;