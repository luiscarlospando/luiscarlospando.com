import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { image, date } = req.body;

        const base64Data = image.replace(/^data:image\/png;base64,/, "");

        await resend.emails.send({
            from: "Paintbook <no-reply@luiscarlospando.com>",
            to: "hey@luiscarlospando.com",
            subject: "Nuevo dibujo recibido 🎨",
            html: `
        <p><strong>Fecha:</strong> ${date}</p>
        <p>Dibujo adjunto abajo:</p>
        <img src="data:image/png;base64,${base64Data}" />
      `,
        });

        return res.status(200).json({ message: "Email sent" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error sending email" });
    }
}
