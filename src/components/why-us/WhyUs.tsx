import {
  ShieldCheck,
  Globe2,
  Landmark,
  BriefcaseBusiness,
} from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Sécurisation des investissements',
    description:
      'Nous vérifions les partenaires locaux, les opportunités et les risques avant engagement.',
  },
  {
    icon: Globe2,
    title: 'Réseau international',
    description:
      'Nous connectons investisseurs, diaspora, entreprises et institutions.',
  },
  {
    icon: Landmark,
    title: 'Conformité OHADA',
    description:
      'Nos procédures respectent les normes administratives et juridiques applicables.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Expertise terrain',
    description:
      'Une parfaite maîtrise du contexte économique centrafricain et régional.',
  },
]

export default function WhyUs() {
  return (
    <section id="about" className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>

            <span className="uppercase tracking-widest text-[#D4A63D] font-semibold">
              Pourquoi nous choisir
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-[#071739] mt-4 leading-tight">
              Votre Partenaire Stratégique pour Réussir en RCA
            </h2>

            <p className="text-gray-600 mt-6 text-lg leading-8">
              AFRICA BUSINESS GATE accompagne les entreprises,
              investisseurs et institutions dans leur implantation,
              leur développement et la sécurisation de leurs opérations
              en République Centrafricaine.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-6 mt-10">

              <div className="bg-[#071739] rounded-2xl p-6 text-white">
                <h3 className="text-4xl font-bold text-[#D4A63D]">
                  10+
                </h3>

                <p className="mt-2 text-gray-300">
                  Années d’expertise
                </p>
              </div>

              <div className="bg-[#071739] rounded-2xl p-6 text-white">
                <h3 className="text-4xl font-bold text-[#D4A63D]">
                  100+
                </h3>

                <p className="mt-2 text-gray-300">
                  Dossiers accompagnés
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {features.map((item, index) => {
              const Icon = item.icon

              return (
                <div
                  key={index}
                  className="bg-[#F8FAFC] rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition"
                >

                  <div className="w-14 h-14 rounded-xl bg-[#071739] flex items-center justify-center mb-5">

                    <Icon
                      size={28}
                      className="text-[#D4A63D]"
                    />

                  </div>

                  <h3 className="font-bold text-xl text-[#071739]">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mt-3 leading-7 text-sm">
                    {item.description}
                  </p>

                </div>
              )
            })}
          </div>

        </div>

      </div>

    </section>
  )
}