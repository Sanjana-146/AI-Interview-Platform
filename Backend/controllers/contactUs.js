import transporter from "../config/nodemailer.js";
export const contactUS = async (req, res) => {
    const { name, email, purpose, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please fill out all required fields.' });
    }

    try {
        const mailOptions = {
            from: `"${name}" <${process.env.SENDER_EMAIL}>`,
            to: process.env.RECEIVING_EMAIL,
            replyTo: email,
            subject: `New Contact Form Submission - ${purpose}`,
            html: `
                <h2>New Message from Website Contact Form</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Purpose:</strong> ${purpose}</p>
                <hr>
                <h3>Message:</h3>
                <p>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        
        console.log('Contact form email sent successfully.');
        res.status(200).json({ success: true, message: 'Email sent successfully!' });

    } catch (error) {
        console.error('Error sending contact form email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
    }
};
