"use client"

import { useEffect, useState } from "react"

export default function Carrito() {
  const [productos, setProductos] = useState<any[]>([])

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito")
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : []
    setProductos(carrito)
  }, [])

  function vaciarCarrito() {
    localStorage.removeItem("carrito")
    setProductos([])
  }

  const total = productos.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0
  )

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">
        <h1 className="text-4xl font-bold mb-8">
          Mi carrito
        </h1>

        {productos.length === 0 ? (
          <p className="text-2xl text-gray-500">
            Tu carrito está vacío
          </p>
        ) : (
          <>
            <div className="space-y-5">
              {productos.map((producto, index) => (
                <div
                  key={index}
                  className="border rounded-2xl p-5 flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-2xl font-bold">
                      {producto.nombre}
                    </h2>

                    <p className="text-gray-500">
                      Cantidad: {producto.cantidad}
                    </p>
                  </div>

                  <p className="text-2xl font-bold">
                    ${producto.precio.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-6 flex justify-between text-3xl font-bold">
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
            </div>

            <button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl text-xl">
              Pagar ahora
            </button>

            <button
              onClick={vaciarCarrito}
              className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl text-xl"
            >
              Vaciar carrito
            </button>
          </>
        )}
      </div>
    </main>
  )
}