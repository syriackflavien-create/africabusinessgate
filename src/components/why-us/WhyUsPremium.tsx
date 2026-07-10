import {
  Globe2,
  ShieldCheck,
  Handshake,
  TrendingUp,
  Users,
  BadgeCheck,
} from 'lucide-react'

const reasons = [
  {
    icon: Globe2,
    title: 'Vision Internationale',
    desc: 'Nous connectons les investisseurs locaux et internationaux au marché centrafricain.',
  },
  {
    icon: ShieldCheck,
    title: 'Sécurité & Conformité',
    desc: 'Toutes nos opérations respectent les normes OHADA et les exigences légales locales.',
  },
  {
    icon: Handshake,
    title: 'Réseau de Partenaires',
    desc: 'Accès direct à un réseau fiable d’acteurs publics et privés en RCA.',
  },
  {
    icon: TrendingUp,
    title: 'Opportunités Réelles',
    desc: 'Identification et analyse des secteurs économiques à fort potentiel de croissance.',
  },
  {
    icon: Users,
    title: 'Accompagnement Humain',
    desc: 'Un suivi personnalisé de chaque projet, de l’idée à l’exécution.',
  },
  {
    icon: BadgeCheck,
    title: 'Expertise Confirmée',
    desc: 'Une équipe expérimentée dans le conseil, l’investissement et la structuration.',
  },
]

export default function WhyUsPremium() {
  return (
    <section className="bg-white py-28">

      <div className="max-w-[1450px] mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto">

          <span className="uppercase tracking-[5px] text-[#D4A63D] font-bold">
            Pourquoi nous
          </span>

          <h2 className="text-5xl md:text-6xl font-extrabold text-[#071739] mt-6 leading-tight">
            Un partenaire fiable
            pour vos investissements
          </h2>

          <p className="text-gray-600 text-xl leading-9 mt-8">
            AFRICA BUSINESS GATE – RCA s’impose comme un acteur stratégique
            dans l’accompagnement des entreprises et investisseurs en Afrique centrale.
          </p>

        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 mt-20">

          {reasons.map((item, index) => {

            const Icon = item.icon

            return (
              <div
                key={index}
                className="group p-10 rounded-[30px] border border-gray-100 bg-[#F8FAFC] hover:bg-white hover:shadow-2xl transition duration-500"
              >

                <div className="w-18 h-18 flex items-center justify-center rounded-2xl bg-[#071739] group-hover:bg-[#D4A63D] transition">

                  <Icon size={30} className="text-white" />

                </div>

                <h3 className="text-2xl font-bold text-[#071739] mt-8">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-5 leading-8">
                  {item.desc}
                </p>

              </div>
            )
          })}

        </div>

        {/* BOTTOM STRIP */}
        <div className="mt-20 bg-[#071739] rounded-[40px] p-12 text-center">

          <h3 className="text-white text-3xl font-bold">
            Un accompagnement stratégique, fiable et durable
          </h3>

          <p className="text-gray-300 mt-4">
            Nous transformons les idées en projets concrets et sécurisés.
          </p>

          <a
            href="/contact"
            className="inline-block mt-8 bg-[#D4A63D] px-10 py-5 rounded-2xl font-bold text-[#071739] hover:scale-105 transition"
          >
            NOUS CONTACTER
          </a>

        </div>

      </div>
    </section>
  )
}