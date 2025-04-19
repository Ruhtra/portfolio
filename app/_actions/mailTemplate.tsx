// components/EmailTemplate.tsx
import React from "react";

type EmailTemplateProps = {
  senderEmail: string;
  senderName: string;
  message: string;
};

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  senderEmail,
  senderName,
  message,
}) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#333",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #eee",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ color: "#2c3e50" }}>Olá {senderName},</h2>

      <p>Recebi sua mensagem com sucesso e vou te responder em breve. 😊</p>

      <h3 style={{ marginTop: "30px" }}>📩 Detalhes do contato:</h3>
      <p>
        <strong>Nome:</strong> {senderName}
      </p>
      <p>
        <strong>Email:</strong> {senderEmail}
      </p>
      <p>
        <strong>Mensagem:</strong>
      </p>
      <blockquote
        style={{
          backgroundColor: "#f9f9f9",
          borderLeft: "4px solid #ccc",
          padding: "10px",
          margin: "10px 0",
        }}
      >
        {message}
      </blockquote>

      <p style={{ marginTop: "40px" }}>
        Obrigado por entrar em contato!
        <br />
        <strong>[Seu Nome]</strong>
      </p>
    </div>
  );
};
