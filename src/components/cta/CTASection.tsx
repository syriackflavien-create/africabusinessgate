export default function CTASection() {
  return (
    <section id="contact" className="py-24 bg-[#071739]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#071739] to-[#0B234F] p-12 md:p-20 border border-white/10">

          {/* Background effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A63D]/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">

            <span className="uppercase tracking-[4px] text-[#D4A63D] font-semibold">
              Développez votre projet
            </span>

            <h2 className="text-4xl md:text-6xl font-bold text-white mt-6 leading-tight">
              Prêt à investir ou
              développer votre activité en RCA ?
            </h2>

            <p className="text-gray-300 mt-6 max-w-3xl mx-auto text-lg leading-8">
              AFRICA BUSINESS GATE vous accompagne
              dans la création, la structuration,
              la sécurisation et le développement
              de vos projets en République Centrafricaine.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

              <a href="/contact" className="bg-[#D4A63D] hover:scale-105 transition duration-300 text-[#071739] font-bold px-8 py-4 rounded-full text-lg">
                Demander une consultation
              </a>

              <button className="border border-white/20 hover:bg-white hover:text-[#071739] transition duration-300 text-white px-8 py-4 rounded-full text-lg">
                Découvrir nos services
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}