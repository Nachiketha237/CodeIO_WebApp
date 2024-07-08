const transporter = require('../config/nodemailer.js')

exports.sendMail = (req, res) => {
    console.log("Inside Controller")
    const {name, email, workshopName, date, time, venue } = req.body

    transporter.sendMail({
        from : 'sannidhi1105@gmail.com',
        to : email,
        subject : 'Registration Sucessfull.',
        text: `Congratulations ${name} on your successfull registration for the workshop ${workshopName}. Your slot has been confirmed. \n Date : ${date} \n Time : ${time} \n Venue : ${venue}`
    }, (err) => {
        console.log(`Error in Sending mail -> Mail ID : ${email}`,err)
    })
}

exports.sendAdminMail = (req, res) => {
    console.log("Inside Controller");
  
    const { content, recipients } = req.body;
  
    // Check if content and recipients are provided
    if (!content) {
      return res.status(400).send('Email content is missing');
    }
  
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).send('Recipients are missing or invalid');
    }
  
    console.log('Email content:', content);
    console.log('Recipients:', recipients);
  
    recipients.forEach(recipient => {
      const { email, user_name } = recipient;
  
      if (!email || !user_name) {
        console.error(`Invalid recipient data:`, recipient);
        return;
      }
  
      transporter.sendMail({
        from: 'sannidhi1105@gmail.com',
        to: email,
        subject: 'Announcement',
        text: `Hello ${user_name},\n\n${content}`
      }, (err, info) => {
        if (err) {
          console.error(`Error in sending mail to ${email}:`, err);
        } else {
          console.log(`Mail sent successfully to ${email}: ${info.response}`);
        }
      });
    });
  
    res.status(200).send('Emails sent successfully');
  };
