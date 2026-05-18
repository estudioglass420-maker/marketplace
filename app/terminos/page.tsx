export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-md">
        <h1 className="text-5xl font-black mb-10">
          Términos y Condiciones
        </h1>

        <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <p>
            Bienvenido a MiMarket. Al realizar una compra en nuestro sitio,
            aceptas los siguientes términos y condiciones.
          </p>

          <div>
            <h2 className="text-2xl font-black mb-3">
              Productos
            </h2>

            <p>
              Todos los productos publicados están sujetos a disponibilidad.
              Las imágenes son ilustrativas y pueden variar ligeramente del
              producto final.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-3">
              Pagos
            </h2>

            <p>
              Los pagos son procesados mediante plataformas externas seguras.
              No almacenamos información bancaria de nuestros clientes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-3">
              Envíos
            </h2>

            <p>
              Realizamos envíos a toda la República Mexicana. Los tiempos de
              entrega pueden variar según la paquetería y ubicación del cliente.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-3">
              Devoluciones
            </h2>

            <p>
              En caso de productos dañados o incorrectos, el cliente deberá
              comunicarse dentro de las primeras 48 horas posteriores a la
              entrega.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-3">
              Privacidad
            </h2>

            <p>
              La información proporcionada por los clientes será utilizada
              únicamente para procesar pedidos y brindar soporte.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}