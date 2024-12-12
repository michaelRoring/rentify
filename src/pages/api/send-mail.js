import { sendMail } from "@/lib/mailService";

export default async function handler(req, res) {
	
  if (req.method === "GET") {
      
      res.status(200).json({ 
        message: 'Send email ready!',
        email: process.env.NODEMAILER_EMAIL
      });
  }

  if (req.method === "POST") {
    // const body = req.body
    const {subject, to, text, html} = req.body
      try {
        const options = await sendMail({
          subject, to, text, html
        });

        res.status(200).json({
              message: 'Send email successed!',
              data: options
          });
      }
      catch(error) {
        res.status(400).json({
              message: err.message,
          });
      }
  }
	res.end();
}