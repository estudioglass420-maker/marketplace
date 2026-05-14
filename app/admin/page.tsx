"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [logged, setLogged] = useState(false)

  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [stock, setStock] = useState("")
  const [imagen, setImagen] = useState("")
  const [productos, setProductos] = useState<any[]>([])

  function entrar() {
    if (password === "1234") {
      setLogged(true)
    } else {
      alert("Contraseña incorrecta")
    }
  }

  async function cargarProductos() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false })

    if (error) {
      alert("Error al cargar productos")
      console.log(error)
      return
    }

    setProductos(data || [])
  }

  useEffect(() => {
    if (logged) {
      cargarProductos()
    }
  }, [logged])

  async function guardarProducto() {
    if (!nombre || !precio || !stock) {
      alert("Llena nombre, precio y stock")
      return
    }

    const { error } = await supabase.from("products").insert([
      {
        nombre: nombre,
        precio: precio,
        stock: Number(stock),
        imagen: imagen,
      },
    ])

    if (error) {
      alert("Error al guardar producto")
      console.log(error)
      return
    }

    setNombre("")
    setPrecio("")
    setStock("")
    setImagen("")

    cargarProductos()
  }

  async function eliminarProducto(id: number) {
    const confirmar = confirm("¿Seguro que quieres eliminar este producto?")

    if (!confirmar) return

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)

    if (error) {
      alert("Error al eliminar producto")
      console.log(error)
      return
    }

    cargarProductos()
  }

  if (!logged) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-md">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Panel Admin
          </h1>

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-4 rounded-xl w-full mb-4"
          />

          <button
            onClick={entrar}
            className="w-full bg-black text-white py-4 rounded-xl text-xl"
          >
            Entrar
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">
          Panel administrador
        </h1>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">
            Nuevo producto
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              type="text"
              placeholder="Nombre del producto"
              className="border p-3 rounded-xl"
            />

            <input
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              type="text"
              placeholder="Precio, ejemplo: $500"
              className="border p-3 rounded-xl"
            />

            <input
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              type="number"
              placeholder="Stock"
              className="border p-3 rounded-xl"
            />

            <input
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              type="text"
              placeholder="URL de imagen"
              className="border p-3 rounded-xl"
            />
          </div>

          <button
            onClick={guardarProducto}
            className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
          >
            Guardar producto
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">
            Productos guardados
          </h2>

          <div className="space-y-4">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="border rounded-2xl p-5 flex justify-between items-center gap-5"
              >
                <div className="flex items-center gap-5">
                  {producto.imagen && (
                    <img
                      src={producto.imagen}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                  )}

                  <div>
                    <h3 className="text-2xl font-bold">
                      {producto.nombre}
                    </h3>

                    <p className="text-gray-500">
                      Stock: {producto.stock}
                    </p>

                    <p className="text-xl font-bold mt-2">
                      {producto.precio}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => eliminarProducto(producto.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}