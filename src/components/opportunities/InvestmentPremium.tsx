import {
  Pickaxe,
  Tractor,
  Zap,
  Building2,
  RadioTower,
  Factory,
  ArrowRight,
} from 'lucide-react'

const opportunities = [
  {
    icon: Pickaxe,
    title: 'Mines & Ressources',
    desc: 'Or, diamant, lithium et ressources stratégiques.',
  },
  {
    icon: Tractor,
    title: 'Agriculture & Élevage',
    desc: 'Production, transformation locale et chaînes de valeur.',
  },
  {
    icon: Zap,
    title: 'Énergie',
    desc: 'Solaire, électrification et infrastructures énergétiques.',
  },
  {
    icon: Building2,
    title: 'BTP & Infrastructures',
    desc: 'Routes, bâtiments, immobilier et projets structurants.',
  },
  {
    icon: RadioTower,
    title: 'Télécoms & Numérique',
    desc: 'Connectivité, services IT et transformation digitale.',
  },
  {
    icon: Factory,
    title: 'Industrie & Commerce',
    desc: 'Distribution, transformation et développement commercial.',
  },
]

export default function InvestmentPremium() {
  return (
    <section className="relative bg-[#071739] py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A63D]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-[1450px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <span className="uppercase tracking-[5px] text-[#D4A63D] font-bold">
              Investir en RCA
            </span>

            <h2 className="text-5xl md:text-6xl font-extrabold text-white mt-6 leading-tight">
              Des opportunités économiques à fort potentiel
            </h2>

            <p className="text-gray-300 text-xl leading-9 mt-8">
              La République Centrafricaine dispose de ressources naturelles,
              agricoles, énergétiques et commerciales majeures. AFRICA BUSINESS
              GATE accompagne les investisseurs dans l’identification,
              la sécurisation et la mise en œuvre de leurs projets.
            </p>

            <a
              href="/invest-in-rca"
              className="inline-flex items-center gap-3 mt-10 bg-[#D4A63D] px-9 py-5 rounded-2xl font-bold text-[#071739] hover:scale-105 transition"
            >
              DÉCOUVRIR LES OPPORTUNITÉS
              <ArrowRight size={20} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {opportunities.map((item, index) => {
              const Icon = item.icon

              return (
                <div
                  key={index}
                  className="group bg-white/10 border border-white/10 backdrop-blur-md rounded-[28px] p-7 hover:bg-white hover:-translate-y-2 transition duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#D4A63D] flex items-center justify-center">
                    <Icon size={30} className="text-[#071739]" />
                  </div>

                  <h3 className="text-white group-hover:text-[#071739] text-xl font-bold mt-6">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 group-hover:text-gray-600 leading-7 mt-4">
                    {item.desc}
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