"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function ProductoPage() {
  const params = useParams()
  const id = params.id as string

  const [producto, setProducto] = useState<any>(null)

  useEffect(() => {
    async function cargarProducto() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.log(error)
        return
      }

      setProducto(data)
    }

    cargarProducto()
  }, [id])

  function comprarAhora() {
    const carritoGuardado = localStorage.getItem("carrito")
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : []

    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: Number(String(producto.precio).replace("$", "").replace(",", "")),
      cantidad: 1,
    })

    localStorage.setItem("carrito", JSON.stringify(carrito))
    window.location.href = "/carrito"
  }

  if (!producto) {
    return (
      <main className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-4xl font-bold">Cargando producto...</h1>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-10 grid grid-cols-2 gap-10">
        <div>
          {producto.imagen && (
            <img
              src={producto.imagen}
              className="w-full rounded-2xl"
            />
          )}
        </div>

        <div>
          <p className="text-green-600 font-bold">
            Nuevo | Envío gratis
          </p>

          <h1 className="text-5xl font-bold mt-4">
            {producto.nombre}
          </h1>

          <p className="text-4xl mt-6 font-bold">
            {producto.precio}
          </p>

          <p className="mt-6 text-gray-600 text-lg">
            Producto disponible con compra segura y envío protegido.
          </p>

          <button
            onClick={comprarAhora}
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-2xl text-xl"
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </main>
  )
}