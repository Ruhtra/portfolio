import { ImageResponse } from "next/og"

// Definindo as dimensões da imagem Open Graph
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Gerando a imagem Open Graph programaticamente
export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(to right, hsl(252, 56%, 57%), rgb(168, 85, 247))",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontWeight: "bold",
          marginBottom: "5px",
          textAlign: "center",
        }}
      >
        Kawan Arthur
      </div>
      <div
        style={{
          fontSize: 28,
          marginBottom: "30px",
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.2)",
          padding: "5px 20px",
          borderRadius: "20px",
        }}
      >
        Ruhtra
      </div>
      <div
        style={{
          fontSize: 40,
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        Desenvolvedor Full-Stack
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: 24,
          }}
        >
          React
        </div>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: 24,
          }}
        >
          Next.js
        </div>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: 24,
          }}
        >
          TypeScript
        </div>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: 24,
          }}
        >
          C#
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
