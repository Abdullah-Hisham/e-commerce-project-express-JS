const nodemailer = require('nodemailer')

const sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{user:'abdulahhisham15@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
            })
            const mailOpts = {
                from : 'abdullah',
                to : options.email, 
                subject : options.subject,
                text : options.message
            }
    await transporter.sendEmail({mailOpts})
}