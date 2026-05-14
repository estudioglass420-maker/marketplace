"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Carrito() {
  const [productos, setProductos] = useState<any[]>([])
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [direccion, setDireccion] = useState("")

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito")
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : []
    setProductos(carrito)
  }, [])

  const total = productos.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0
  )

  function vaciarCarrito() {
    localStorage.removeItem("carrito")
    setProductos([])
  }

  async function finalizarPedido() {
    if (!nombre || !telefono || !direccion) {
      alert("Llena nombre, teléfono y dirección")
      return
    }

    if (productos.length === 0) {
      alert("Tu carrito está vacío")
      return
    }

    const { error } = await supabase.from("orders").insert([
      {
        nombre,
        telefono,
        direccion,
        productos,
        total,
        estado: "pendiente",
      },
    ])

    if (error) {
      alert("Error al guardar pedido")
      console.log(error)
      return
    }

    alert("Pedido guardado correctamente")

    setNombre("")
    setTelefono("")
    setDireccion("")
    vaciarCarrito()
  }

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

            <div className="mt-8 border-t pt-8">
              <h2 className="text-3xl font-bold mb-5">
                Datos de entrega
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                  placeholder="Nombre completo"
                  className="border p-4 rounded-xl"
                />

                <input
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  type="text"
                  placeholder="Teléfono"
                  className="border p-4 rounded-xl"
                />

                <textarea
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Dirección completa"
                  className="border p-4 rounded-xl"
                />
              </div>

              <button
                onClick={finalizarPedido}
                className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl text-xl"
              >
                Finalizar pedido
              </button>

              <button
                onClick={vaciarCarrito}
                className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl text-xl"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}