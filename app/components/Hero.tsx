export default function Hero() {
  return (
    <section className="relative bg-white py-20 px-6 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-green-700">
        237Circulo: Transform Waste into Wealth
      </h1>
      <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
        The first AI-powered marketplace connecting Cameroon communities to a 
        sustainable circular economy. Earn FCFA while cleaning the streets of 237.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <button className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700">
          Start Recycling
        </button>
        <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full font-bold">
          Marketplace
        </button>
      </div>
    </section>
  );
}