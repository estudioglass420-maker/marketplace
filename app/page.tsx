"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [productos, setProductos] = useState<any[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [categoriaActiva, setCategoriaActiva] = useState("Todos")

  const categorias = ["Todos", "Bongs", "Grinders", "Sopletes", "Tazas", "Accesorios"]

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

  const productosFiltrados = productos.filter((producto) => {
    const nombre = producto.nombre || ""
    const coincideBusqueda = nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria =
      categoriaActiva === "Todos" || producto.categoria === categoriaActiva

    return coincideBusqueda && coincideCategoria
  })

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-gray-900">
      <header className="sticky top-0 z-50 bg-[#fff159] shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <a href="/" className="text-2xl sm:text-3xl font-black tracking-tight">
              MiMarket
            </a>

            <a
              href="/carrito"
              className="md:hidden bg-white px-4 py-2 rounded-xl font-bold shadow-sm"
            >
              🛒
            </a>
          </div>

          <div className="w-full flex-1 bg-white rounded-xl shadow-sm flex items-center px-4">
            <span className="text-gray-400 text-xl">🔎</span>
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              type="text"
              placeholder="Buscar productos..."
              className="w-full p-3 outline-none rounded-xl text-base"
            />
          </div>

          <a
            href="/carrito"
            className="hidden md:block bg-white hover:bg-gray-100 px-5 py-3 rounded-xl font-bold shadow-sm transition"
          >
            🛒 Carrito
          </a>
        </div>

        <div className="border-t border-yellow-300">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex gap-3 overflow-x-auto">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaActiva(categoria)}
                className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-full font-semibold transition text-sm sm:text-base ${
                  categoriaActiva === categoria
                    ? "bg-gray-900 text-white"
                    : "bg-white/80 hover:bg-white text-gray-800"
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14 grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-white text-center lg:text-left">
            <p className="inline-block bg-white/20 px-4 py-2 rounded-full font-bold mb-4 text-sm sm:text-base">
              🔥 Ofertas disponibles
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              Compra fácil, rápido y seguro
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-blue-50">
              Productos seleccionados, envío seguro y pedidos directos desde la tienda.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
              <a
                href="#productos"
                className="bg-white text-blue-600 px-7 py-4 rounded-2xl font-black hover:scale-105 transition"
              >
                Ver productos
              </a>

              <a
                href="/carrito"
                className="bg-black/30 text-white px-7 py-4 rounded-2xl font-bold hover:bg-black/40 transition"
              >
                Ir al carrito
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-yellow-100 rounded-2xl p-4 sm:p-5">
                <p className="text-3xl sm:text-4xl">🚚</p>
                <h3 className="font-black text-base sm:text-xl mt-3">Envío seguro</h3>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">A todo México</p>
              </div>

              <div className="bg-green-100 rounded-2xl p-4 sm:p-5">
                <p className="text-3xl sm:text-4xl">🛡️</p>
                <h3 className="font-black text-base sm:text-xl mt-3">Compra protegida</h3>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">Pedidos registrados</p>
              </div>

              <div className="bg-blue-100 rounded-2xl p-4 sm:p-5">
                <p className="text-3xl sm:text-4xl">📦</p>
                <h3 className="font-black text-base sm:text-xl mt-3">Stock real</h3>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">Productos actualizados</p>
              </div>

              <div className="bg-purple-100 rounded-2xl p-4 sm:p-5">
                <p className="text-3xl sm:text-4xl">⭐</p>
                <h3 className="font-black text-base sm:text-xl mt-3">Atención rápida</h3>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">Proceso sencillo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-6 sm:-mt-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4">
            <span className="text-4xl">💳</span>
            <div>
              <h3 className="font-black">Pagos flexibles</h3>
              <p className="text-gray-500">Listo para Mercado Pago</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4">
            <span className="text-4xl">🛒</span>
            <div>
              <h3 className="font-black">Carrito inteligente</h3>
              <p className="text-gray-500">Compra varios productos</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 sm:col-span-2 lg:col-span-1">
            <span className="text-4xl">📋</span>
            <div>
              <h3 className="font-black">Pedidos registrados</h3>
              <p className="text-gray-500">Tus pedidos quedan guardados</p>
            </div>
          </div>
        </div>
      </section>

      <section id="productos" className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-blue-600 font-black uppercase tracking-wide">
              Catálogo
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
              Productos destacados
            </h2>
          </div>

          <p className="text-gray-500 font-semibold">
            {productosFiltrados.length} productos encontrados
          </p>
        </div>

        {productosFiltrados.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center shadow-md">
            <p className="text-2xl sm:text-3xl font-black text-gray-700">
              No encontramos productos
            </p>
            <p className="text-gray-500 mt-2">
              Prueba con otra búsqueda o categoría.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {productosFiltrados.map((producto) => (
              <article
                key={producto.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 border border-gray-100"
              >
                <a href={`/producto/${producto.id}`} className="block">
                  <div className="relative bg-gray-100 overflow-hidden">
                    {producto.imagen ? (
                      <img
                        src={producto.imagen}
                        className="w-full h-56 sm:h-64 lg:h-72 object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-56 sm:h-64 lg:h-72 flex items-center justify-center text-gray-400">
                        Sin imagen
                      </div>
                    )}

                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 sm:px-4 py-2 rounded-full font-black text-xs sm:text-sm shadow-lg">
                      Envío gratis
                    </div>

                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 sm:px-4 py-2 rounded-full font-black text-xs sm:text-sm shadow-lg">
                      Oferta
                    </div>
                  </div>
                </a>

                <div className="p-5 sm:p-6">
                  <p className="text-blue-600 font-black text-sm uppercase">
                    {producto.categoria || "Sin categoría"}
                  </p>

                  <h3 className="text-xl sm:text-2xl font-black mt-2">
                    {producto.nombre}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Stock disponible: {producto.stock}
                  </p>

                  <div className="mt-5">
                    <p className="text-3xl sm:text-4xl font-black text-gray-900">
                      {producto.precio}
                    </p>
                    <p className="text-green-600 font-bold mt-1">
                      Mismo precio en tienda online
                    </p>
                  </div>

                  <a
                    href={`/producto/${producto.id}`}
                    className="block w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-center font-black text-lg transition"
                  >
                    Ver producto
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    <footer className="bg-white border-t mt-16">
  <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      <div>
        <h3 className="text-2xl font-black">
          MiMarket
        </h3>

        <p className="text-gray-500 mt-4 leading-relaxed">
          Ecommerce moderno para comprar productos de forma rápida,
          segura y sencilla.
        </p>
      </div>

      <div>
        <h4 className="font-black text-lg mb-4">
          Información
        </h4>

        <div className="flex flex-col gap-3 text-gray-600">
          <a
            href="/terminos"
            className="hover:text-black transition"
          >
            Términos y condiciones
          </a>

          <a
            href="#"
            className="hover:text-black transition"
          >
            Política de privacidad
          </a>

          <a
            href="#"
            className="hover:text-black transition"
          >
            Política de devoluciones
          </a>
        </div>
      </div>

      <div>
        <h4 className="font-black text-lg mb-4">
          Ayuda
        </h4>

        <div className="flex flex-col gap-3 text-gray-600">
          <a href="#" className="hover:text-black transition">
            Envíos
          </a>

          <a href="#" className="hover:text-black transition">
            Métodos de pago
          </a>

          <a href="#" className="hover:text-black transition">
            Soporte
          </a>
        </div>
      </div>

      <div>
        <h4 className="font-black text-lg mb-4">
          Contacto
        </h4>

        <div className="flex flex-col gap-3 text-gray-600">
          <p>Guadalajara, México</p>
          <p>contacto@mimarket.com</p>
          <p>Atención personalizada</p>
        </div>
      </div>
    </div>

    <div className="border-t mt-10 pt-6 text-center text-gray-500">
      © 2026 MiMarket. Todos los derechos reservados.
    </div>
  </div>
</footer>
    </main>
  )
}