import {
  Pickaxe,
  Tractor,
  Building2,
  RadioTower,
  Factory,
  Zap,
} from 'lucide-react'

const sectors = [
  {
    icon: Pickaxe,
    title: 'Mines & Ressources',
    description:
      'Or, diamant, lithium et ressources stratégiques à fort potentiel.',
  },
  {
    icon: Tractor,
    title: 'Agriculture',
    description:
      'Transformation agricole, élevage et exploitation durable.',
  },
  {
    icon: Zap,
    title: 'Énergie',
    description:
      'Électrification, solaire et infrastructures énergétiques.',
  },
  {
    icon: Building2,
    title: 'BTP & Infrastructures',
    description:
      'Routes, bâtiments, immobilier et projets publics.',
  },
  {
    icon: RadioTower,
    title: 'Télécommunications',
    description:
      'Développement numérique, connectivité et services IT.',
  },
  {
    icon: Factory,
    title: 'Industrie & Commerce',
    description:
      'Transformation locale et distribution commerciale.',
  },
]

export default function InvestmentOpportunities() {
  return (
    <section id="opportunities" className="bg-[#071739] py-24 text-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}        
        <div className="text-center mb-16">

          <span className="uppercase tracking-widest text-[#D4A63D] font-semibold">
            Opportunités d’investissement
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Secteurs stratégiques en République Centrafricaine
          </h2>

          <p className="text-gray-300 mt-5 max-w-3xl mx-auto">
            Nous accompagnons les investisseurs dans l’identification
            des opportunités économiques les plus prometteuses
            et leur mise en œuvre sur le terrain.
          </p>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {sectors.map((sector, index) => {
            const Icon = sector.icon

            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-[#D4A63D] transition duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#D4A63D] flex items-center justify-center mb-6">

                  <Icon
                    size={30}
                    className="text-[#071739]"
                  />

                </div>

                <h3 className="text-2xl font-bold">
                  {sector.title}
                </h3>

                <p className="text-gray-300 mt-4 leading-7">
                  {sector.description}
                </p>

              </div>
            )
          })}
        </div>

      </div>

    </section>
  )
}
