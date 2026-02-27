import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatMexDate(isoString) {
    const date = new Date(isoString);

    const parts = new Intl.DateTimeFormat("es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "America/Chihuahua",
    }).formatToParts(date);

    const map = {};
    parts.forEach((p) => {
        map[p.type] = p.value;
    });

    return `${map.day} ${map.month} ${map.year}`;
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { image, date } = req.body;

        const base64Data = image.replace(/^data:image\/png;base64,/, "");

        const formattedDate = formatMexDate(date);

        // Puedes cambiar esta lógica si quieres numeración distinta
        const imageName = `${Date.now()}.png`;

        const frontmatter = `---
image: ${imageName}
date: ${date}
alt: Dibujo enviado desde Paintbook el ${formattedDate}
---`;

        await resend.emails.send({
            from: "Paintbook <no-reply@luiscarlospando.com>",
            to: "hey@luiscarlospando.com",
            subject: "Nuevo dibujo recibido 🎨",
            html: `
                <p><strong>Fecha:</strong> ${formattedDate}</p>

                <p><strong>Frontmatter listo para pegar:</strong></p>

                <pre style="background:#f4f4f4;padding:12px;border-radius:6px;overflow:auto;">
${frontmatter}
                </pre>

                <p><strong>Dibujo:</strong></p>

                <img src="data:image/png;base64,${base64Data}" style="max-width:100%;border:1px solid #ddd;" />
            `,
        });

        return res.status(200).json({ message: "Email sent" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error sending email" });
    }
}
