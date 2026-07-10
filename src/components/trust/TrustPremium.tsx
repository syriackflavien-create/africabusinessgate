import {
  BadgeCheck,
  Building2,
  Globe2,
  ShieldCheck,
} from 'lucide-react'

const stats = [
  {
    number: '100+',
    label: 'Dossiers accompagnés',
  },
  {
    number: '50+',
    label: 'Partenaires locaux',
  },
  {
    number: '24h',
    label: 'Réactivité moyenne',
  },
  {
    number: '360°',
    label: 'Accompagnement complet',
  },
]

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Confidentialité',
    desc: 'Traitement discret et sécurisé des informations sensibles.',
  },
  {
    icon: Globe2,
    title: 'Ouverture internationale',
    desc: 'Accompagnement des investisseurs, entreprises et diaspora.',
  },
  {
    icon: Building2,
    title: 'Ancrage local',
    desc: 'Maîtrise du terrain, des acteurs et des réalités économiques.',
  },
  {
    icon: BadgeCheck,
    title: 'Fiabilité',
    desc: 'Processus clair, suivi structuré et accompagnement durable.',
  },
]

export default function TrustPremium() {
  return (
    <section className="bg-white py-28">
      <div className="max-w-[1450px] mx-auto px-6">

        <div className="text-center max-w-4xl mx-auto">
          <span className="uppercase tracking-[5px] text-[#D4A63D] font-bold">
            Confiance & Crédibilité
          </span>

          <h2 className="text-5xl md:text-6xl font-extrabold text-[#071739] mt-6 leading-tight">
            Un partenaire fiable pour vos ambitions
          </h2>

          <p className="text-gray-600 text-xl leading-9 mt-8">
            Nous construisons des relations solides avec les investisseurs,
            entreprises et institutions grâce à une approche transparente,
            structurée et orientée résultats.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-[#071739] rounded-[28px] p-8 text-center shadow-xl"
            >
              <h3 className="text-5xl font-extrabold text-[#D4A63D]">
                {item.number}
              </h3>
              <p className="text-gray-300 mt-4 font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {trustItems.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={index}
                className="group bg-[#F8FAFC] rounded-[30px] p-8 border border-gray-100 hover:bg-white hover:shadow-2xl transition duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#071739] group-hover:bg-[#D4A63D] flex items-center justify-center transition">
                  <Icon size={30} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold text-[#071739] mt-7">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-8 mt-4">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-20 rounded-[40px] bg-[#F8FAFC] border border-gray-100 p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#071739]">
            Une expertise locale au service d’une ambition internationale
          </h3>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto leading-8">
            AFRICA BUSINESS GATE – RCA facilite l’accès au marché,
            accompagne les démarches et sécurise les relations d’affaires.
          </p>
        </div>

      </div>
    </section>
  )
}