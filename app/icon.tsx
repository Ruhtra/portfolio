import { ImageResponse } from "next/og"

// Definindo as dimensões do ícone
export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

// Gerando o ícone programaticamente com "R" de Ruhtra
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 22,
        fontWeight: "bold",
        background: "linear-gradient(to right, hsl(252, 56%, 57%), rgb(168, 85, 247))",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: "4px",
      }}
    >
      R
    </div>,
    {
      ...size,
    },
  )
}
