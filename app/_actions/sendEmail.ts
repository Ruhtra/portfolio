"use server";
import { Resend } from "resend";
import { EmailTemplate } from "./mailTemplate";
const resend = new Resend(process.env.RESENT_API_KEY);
const FROM = "Ruhtra_contact <no-reply@ruhtra.work>";

export const sendContantMail = async (
  email: string,
  name: string,
  message: string
) => {
  const response = await resend.emails.send({
    from: FROM,
    to: [email, "kawanarthurtech@gmail.com"],
    subject: "Contato do Portfólio de Kawan Arthur (Ruhtra)",
    react: await EmailTemplate({
      senderEmail: email,
      senderName: name,
      message: message,
    }),
  });

  if (response.error) {
    return { error: "Failed to send email" };
  }
  return { success: "Email sent successfully" };
};
