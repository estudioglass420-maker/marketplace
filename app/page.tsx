"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [productos, setProductos] = useState<any[]>([])

  async function cargarProductos() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setProductos(data || [])
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-yellow-400 shadow-md">
        <div className="max-w-7xl mx-auto p-4 flex items-center gap-4">
          <h1 className="text-3xl font-bold">MiMarket</h1>

          <input
            type="text"
            placeholder="Buscar productos..."
            className="flex-1 p-3 rounded-lg outline-none"
          />

          <button className="bg-black text-white px-5 py-3 rounded-lg">
            Buscar
          </button>

          <a
            href="/carrito"
            className="bg-white px-4 py-2 rounded-xl font-bold"
          >
            🛒
          </a>
        </div>
      </header>

      <section className="bg-blue-500 text-white p-16 text-center">
        <h2 className="text-5xl font-bold">Bienvenido a MiMarket</h2>
        <p className="mt-4 text-2xl">Compra fácil, rápido y seguro</p>
      </section>

      <section className="max-w-7xl mx-auto p-10">
        <h2 className="text-4xl font-bold mb-6">
          Productos destacados
        </h2>

        {productos.length === 0 ? (
          <p className="text-2xl text-gray-500">
            Aún no hay productos guardados.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-2xl shadow-md p-4"
              >
                {producto.imagen && (
                  <img
                    src={producto.imagen}
                    className="w-full h-60 object-cover rounded-xl"
                  />
                )}

                <h3 className="text-2xl font-bold mt-4">
                  {producto.nombre}
                </h3>

                <p className="text-gray-500 mt-2">
                  Stock: {producto.stock}
                </p>

                <p className="text-3xl font-bold mt-4">
                  {producto.precio}
                </p>

                <a
                  href={`/producto/${producto.id}`}
                  className="block w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-center"
                >
                  Ver producto
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}