"use client"

import { useEffect, useState } from "react"

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<any[]>([])

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito")

    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado))
    }
  }, [])

  function eliminarProducto(index: number) {
    const nuevoCarrito = [...carrito]

    nuevoCarrito.splice(index, 1)

    setCarrito(nuevoCarrito)

    localStorage.setItem(
      "carrito",
      JSON.stringify(nuevoCarrito)
    )
  }

  const total = carrito.reduce((acc, producto) => {
    return (
      acc +
      Number(producto.precio) * producto.cantidad
    )
  }, 0)

  async function pagarConMercadoPago() {
    try {
      const response = await fetch(
        "/api/create-preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productos: carrito,
          }),
        }
      )

      const data = await response.json()

      if (data.init_point) {
        window.location.href = data.init_point
      }
    } catch (error) {
      console.log(error)
      alert("Error al iniciar pago")
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-black mb-10">
          Tu carrito
        </h1>

        {carrito.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-md">
            <p className="text-3xl text-gray-500">
              Tu carrito está vacío.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {carrito.map((producto, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-md p-5 flex flex-col md:flex-row md:items-center gap-5 justify-between"
                >
                  <div className="flex items-center gap-5">
                    {producto.imagen && (
                      <img
                        src={producto.imagen}
                        className="w-28 h-28 object-cover rounded-2xl"
                      />
                    )}

                    <div>
                      <h2 className="text-2xl font-black">
                        {producto.nombre}
                      </h2>

                      <p className="text-gray-500 mt-2">
                        Cantidad: {producto.cantidad}
                      </p>

                      <p className="text-3xl font-black text-green-600 mt-3">
                        $
                        {(
                          Number(producto.precio) *
                          producto.cantidad
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      eliminarProducto(index)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-bold"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl shadow-md p-8 mt-10">
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-black">
                  Total
                </h2>

                <p className="text-5xl font-black text-green-600">
                  ${total.toLocaleString()}
                </p>
              </div>

              <button
                onClick={pagarConMercadoPago}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl text-2xl font-black transition"
              >
                Pagar con Mercado Pago
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}