import { MercadoPagoConfig, Preference } from "mercadopago"
import { NextResponse } from "next/server"

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
})

export async function POST(request: Request) {
  try {
    const { productos } = await request.json()

    const preference = new Preference(client)

    const result = await preference.create({
      body: {
        items: productos.map((producto: any) => ({
          title: producto.nombre,
          quantity: producto.cantidad,
          unit_price: Number(producto.precio),
          currency_id: "MXN",
        })),
        back_urls: {
          success: "http://localhost:3000/carrito",
          failure: "http://localhost:3000/carrito",
          pending: "http://localhost:3000/carrito",
        },
      },
    })

    return NextResponse.json({ init_point: result.init_point })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Error al crear preferencia" },
      { status: 500 }
    )
  }
}