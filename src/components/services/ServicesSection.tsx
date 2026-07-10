'use client'

import {
  Building2,
  BriefcaseBusiness,
  FileText,
  ShieldCheck,
  Users,
  Landmark,
  BadgeDollarSign,
  Scale,
} from 'lucide-react'

const services = [
  {
    icon: Building2,
    title: 'Création d’entreprise',
    description:
      'Accompagnement complet dans la création, structuration et régularisation de votre société.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Conseil en investissement',
    description:
      'Études, accompagnement et sécurisation de vos projets d’investissement en RCA.',
  },
  {
    icon: Users,
    title: 'Représentation locale',
    description:
      'Nous représentons entreprises, diaspora et investisseurs sur le terrain.',
  },
  {
    icon: FileText,
    title: 'Appels d’offres',
    description:
      'Veille, acquisition et soumission de dossiers publics et privés.',
  },
  {
    icon: Landmark,
    title: 'Domiciliation',
    description:
      'Solutions de domiciliation légale et administrative pour entreprises.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Recrutement local',
    description:
      'Sélection et gestion de personnel qualifié selon vos besoins.',
  },
  {
    icon: Scale,
    title: 'Assistance juridique',
    description:
      'Support administratif, réglementaire et conformité OHADA.',
  },
  {
    icon: ShieldCheck,
    title: 'Sécurisation partenaires',
    description:
      'Vérification et analyse de fiabilité des partenaires locaux.',
  },
]

export default function ServicesSection() {
  return (
    //<section className="bg-[#F8FAFC] py-24">
    <section id="services" className="bg-[#F8FAFC] py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">

          <span className="text-[#D4A63D] font-semibold uppercase tracking-wider">
            Nos Services
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#071739] mt-4">
            UNE EXPERTISE COMPLETE POUR VOS PROJETS
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
            AFRICA BUSINESS GATE accompagne les investisseurs,
            entreprises et institutions à chaque étape de leur implantation
            et développement en République Centrafricaine.
          </p>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition duration-300 border border-gray-100 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-xl bg-[#071739] flex items-center justify-center mb-6">

                  <Icon
                    size={28}
                    className="text-[#D4A63D]"
                  />

                </div>

                <h3 className="text-xl font-bold text-[#071739] mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm leading-7">
                  {service.description}
                </p>

              </div>
            )
          })}
        </div>

      </div>

    </section>
  )
}