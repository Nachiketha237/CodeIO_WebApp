const transporter = require('../config/nodemailer.js')

exports.sendMail = (req, res) => {
    console.log("Inside Controller")
    const { email, workshopName, date, time, venue } = req.body

    transporter.sendMail({
        from : 'sannidhi1105@gmail.com',
        to : email,
        subject : 'Registration Sucessfull.',
        text: `Congratulations on your successfull registration for the workshop ${workshopName}. Your slot has been confirmed. \n Date : ${date} \n Time : ${time} \n Venue : ${venue}`
    }, (err) => {
        console.log(`Error in Sending mail -> Mail ID : ${email}`)
    })
}