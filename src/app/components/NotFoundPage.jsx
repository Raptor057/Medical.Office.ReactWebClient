import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-100 sm:py-16 lg:px-8">
      <div className="text-center">
        <p className="text-2xl font-bold text-indigo-600">404</p>
        <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-6xl">
          Oops! Página No Encontrada
        </h1>
        <p className="mt-6 text-lg text-gray-600 sm:text-xl">
        La página que estás buscando no existe o ha sido movida.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link
            href="/home/"
            className="px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Regresar a la página principal
          </Link>
          {/* <Link
            href="/support"
            className="px-5 py-3 text-sm font-medium text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Contact Support
          </Link> */}
        </div>
        {/* <div className="mt-12">
          <img
            src="../public/images/404-illustration.svg"
            alt="Page not found illustration"
            className="w-full max-w-md mx-auto"
          />
        </div> */}
      </div>
    </main>
  );
}
