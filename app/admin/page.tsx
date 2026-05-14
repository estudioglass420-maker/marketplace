"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [logged, setLogged] = useState(false)

  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [stock, setStock] = useState("")
  const [categoria, setCategoria] = useState("")
  const [imagen, setImagen] = useState("")
  const [archivoImagen, setArchivoImagen] = useState<File | null>(null)

  const [productos, setProductos] = useState<any[]>([])
  const [pedidos, setPedidos] = useState<any[]>([])

  function entrar() {
    if (password === "1234") {
      setLogged(true)
    } else {
      alert("Contraseña incorrecta")
    }
  }

  async function cargarProductos() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false })

    setProductos(data || [])
  }

  async function cargarPedidos() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false })

    setPedidos(data || [])
  }

  useEffect(() => {
    if (logged) {
      cargarProductos()
      cargarPedidos()
    }
  }, [logged])

  async function subirImagen() {
    if (!archivoImagen) {
      return imagen
    }

    const nombreArchivo = `${Date.now()}-${archivoImagen.name}`

    const { error } = await supabase.storage
      .from("product-images")
      .upload(nombreArchivo, archivoImagen)

    if (error) {
      alert("Error al subir imagen")
      console.log(error)
      return ""
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(nombreArchivo)

    return data.publicUrl
  }

  async function guardarProducto() {
    if (!nombre || !precio || !stock || !categoria) {
      alert("Llena nombre, precio, stock y categoría")
      return
    }

    const urlImagen = await subirImagen()

    await supabase.from("products").insert([
      {
        nombre,
        precio,
        stock: Number(stock),
        categoria,
        imagen: urlImagen,
      },
    ])

    setNombre("")
    setPrecio("")
    setStock("")
    setCategoria("")
    setImagen("")
    setArchivoImagen(null)

    cargarProductos()
  }

  async function eliminarProducto(id: number) {
    const confirmar = confirm("¿Seguro que quieres eliminar este producto?")
    if (!confirmar) return

    await supabase.from("products").delete().eq("id", id)
    cargarProductos()
  }

  async function cambiarEstadoPedido(id: number, estado: string) {
    await supabase
      .from("orders")
      .update({ estado })
      .eq("id", id)

    cargarPedidos()
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
            Pedidos recibidos
          </h2>

          <div className="space-y-5">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="border rounded-2xl p-5">
                <div className="flex justify-between gap-5">
                  <div>
                    <h3 className="text-2xl font-bold">
                      Pedido #{pedido.id}
                    </h3>

                    <p>Cliente: {pedido.nombre}</p>
                    <p>Teléfono: {pedido.telefono}</p>
                    <p>Dirección: {pedido.direccion}</p>

                    <p className="mt-2 font-bold">
                      Estado: {pedido.estado}
                    </p>
                  </div>

                  <p className="text-3xl font-bold">
                    ${Number(pedido.total).toLocaleString()}
                  </p>
                </div>

                <div className="mt-4 bg-gray-100 rounded-xl p-4">
                  <h4 className="font-bold mb-2">Productos:</h4>

                  {pedido.productos?.map((producto: any, index: number) => (
                    <p key={index}>
                      {producto.nombre} - Cantidad: {producto.cantidad}
                    </p>
                  ))}
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => cambiarEstadoPedido(pedido.id, "pendiente")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-xl"
                  >
                    Pendiente
                  </button>

                  <button
                    onClick={() => cambiarEstadoPedido(pedido.id, "pagado")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                  >
                    Pagado
                  </button>

                  <button
                    onClick={() => cambiarEstadoPedido(pedido.id, "enviado")}
                    className="bg-orange-500 text-white px-4 py-2 rounded-xl"
                  >
                    Enviado
                  </button>

                  <button
                    onClick={() => cambiarEstadoPedido(pedido.id, "entregado")}
                    className="bg-green-500 text-white px-4 py-2 rounded-xl"
                  >
                    Entregado
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

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

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="border p-3 rounded-xl"
            >
              <option value="">Selecciona categoría</option>
              <option value="Bongs">Bongs</option>
              <option value="Grinders">Grinders</option>
              <option value="Sopletes">Sopletes</option>
              <option value="Tazas">Tazas</option>
              <option value="Accesorios">Accesorios</option>
            </select>

            <input
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              type="text"
              placeholder="URL de imagen opcional"
              className="border p-3 rounded-xl"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setArchivoImagen(e.target.files ? e.target.files[0] : null)
              }
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

                    <p className="text-gray-500">
                      Categoría: {producto.categoria || "Sin categoría"}
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