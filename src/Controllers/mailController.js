import axios from "axios";

export const sendMail = async (req, res) => {
  console.log(req.body.productName);
  if (!req.body.productName) {

    const { name, phone, email, message } = req.body;
    console.log(`Received data: ${JSON.stringify(req.body)}`);
    if (!name || !phone || !email || !message) {
      return res.status(400).send('All fields are required');
    }

    try {
      await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          sender: { name: 'Akdenar Website', email: process.env.SENDER_MAIL },
          to: [{ email: process.env.RECEIVER_EMAIL }],
          subject: 'Query from akdenar.com',
          htmlContent: `
                      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
                        <div style="background-color: #f8f9fa; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                          <h2 style="color: #333; margin-top: 0;">New Website Inquiry</h2>
                          <p style="color: #666;">You have received an inquiry from akdenar.com website</p>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                          <h3 style="color: #444; border-bottom: 1px solid #eee; padding-bottom: 8px;">Contact Information</h3>
                          <p><strong style="color: #555;">Name:</strong> ${name}</p>
                          <p><strong style="color: #555;">Phone:</strong> ${phone}</p>
                          <p><strong style="color: #555;">Email:</strong> ${email}</p>
                        </div>
                        
                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
                          <h3 style="color: #444; margin-top: 0;">Message</h3>
                          <p style="line-height: 1.6;">${message}</p>
                        </div>
                      </div>
                    `,
        },
        {
          headers: {
            'api-key': process.env.API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  } else {
    try {
      const { name, phone, email, message, companyName, productName } = req.body;
      console.log(`Received data: ${JSON.stringify(req.body)}`);

      if (!name || !phone || !email || !message || !productName) {
        return res.status(400).send('All fields are required');
      }

      await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          sender: { name: 'Akdenar Website', email: process.env.SENDER_MAIL },
          to: [{ email: process.env.RECEIVER_EMAIL }],
          subject: 'Query from akdenar.com',
          htmlContent: `
                      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
                        <div style="background-color: #f8f9fa; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                          <h2 style="color: #333; margin-top: 0;">New Website Inquiry</h2>
                          <p style="color: #666;">You have received an inquiry from akdenar.com website</p>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                          <h3 style="color: #444; border-bottom: 1px solid #eee; padding-bottom: 8px;">Contact Information</h3>
                          <p><strong style="color: #555;">Name:</strong> ${name}</p>
                          <p><strong style="color: #555;">Phone:</strong> ${phone}</p>
                          <p><strong style="color: #555;">Email:</strong> ${email}</p>
                          ${companyName ? `<p><strong style="color: #555;">Company Name:</strong> ${companyName}</p>` : ''}
                          <p><strong style="color: #555;">Product Name:</strong> ${productName}</p>
                        </div>
                        
                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
                          <h3 style="color: #444; margin-top: 0;">Message</h3>
                          <p style="line-height: 1.6;">${message}</p>
                        </div>
                      </div>
                    `,
        },
        {
          headers: {
            'api-key': process.env.API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  }
}