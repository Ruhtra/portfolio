import { ImageResponse } from "next/og"

// Definindo as dimensões do ícone para Apple
export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

// Gerando o ícone Apple programaticamente com "R" de Ruhtra
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 100,
        fontWeight: "bold",
        background: "linear-gradient(to right, hsl(252, 56%, 57%), rgb(168, 85, 247))",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: "22%",
      }}
    >
      R
    </div>,
    {
      ...size,
    },
  )
}
