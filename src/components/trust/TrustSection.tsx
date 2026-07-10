const stats = [
  {
    number: '100+',
    label: 'Projets accompagnés',
  },
  {
    number: '50+',
    label: 'Partenaires stratégiques',
  },
  {
    number: '24h',
    label: 'Temps de réactivité',
  },
  {
    number: '10+',
    label: 'Années d’expertise',
  },
]

const testimonials = [
  {
    name: 'Investisseur International',
    text: 'Une équipe professionnelle qui maîtrise parfaitement les réalités du terrain en RCA.',
  },
  {
    name: 'Entreprise Partenaire',
    text: 'Un accompagnement structuré et efficace pour notre implantation locale.',
  },
  {
    name: 'Diaspora Entrepreneur',
    text: 'Africa Business Gate nous a permis de concrétiser notre projet rapidement.',
  },
]

export default function TrustSection() {
  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">

          <span className="uppercase tracking-widest text-[#D4A63D] font-semibold">
            Confiance & Crédibilité
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#071739] mt-4">
            Pourquoi nos partenaires nous font confiance
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
            Nous accompagnons les investisseurs, institutions,
            entreprises et membres de la diaspora dans leurs
            projets avec professionnalisme et transparence.
          </p>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-[#071739] rounded-3xl p-8 text-center text-white"
            >
              <h3 className="text-5xl font-bold text-[#D4A63D]">
                {item.number}
              </h3>

              <p className="mt-3 text-gray-300">
                {item.label}
              </p>
            </div>
          ))}

        </div>

        {/* TESTIMONIALS */}
        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#F8FAFC] rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition"
            >

              <div className="text-[#D4A63D] text-5xl mb-4">
                “
              </div>

              <p className="text-gray-600 leading-8">
                {item.text}
              </p>

              <div className="mt-6 font-bold text-[#071739]">
                {item.name}
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}