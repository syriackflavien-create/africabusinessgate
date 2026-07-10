import FadeIn from '../animations/FadeIn'

import {
  Building2,
  BriefcaseBusiness,
  FileSearch,
  Landmark,
  ShieldCheck,
  Users,
} from 'lucide-react'

const services = [
  {
    icon: Building2,
    title: 'Création & Structuration d’Entreprise',
    description:
      'Création légale, régularisation et accompagnement administratif complet.',
  },
  {
    icon: Landmark,
    title: 'Conseil en Investissement',
    description:
      'Études, implantation, analyse de risques et développement stratégique.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Représentation Locale',
    description:
      'Représentation d’entreprises, investisseurs, ONG et diaspora.',
  },
  {
    icon: FileSearch,
    title: 'Appels d’Offres',
    description:
      'Veille, acquisition, soumission et suivi administratif des dossiers.',
  },
  {
    icon: Users,
    title: 'Gestion RH Locale',
    description:
      'Recrutement, gestion du personnel et assistance opérationnelle.',
  },
  {
    icon: ShieldCheck,
    title: 'Sécurisation des Investissements',
    description:
      'Due diligence, vérification de partenaires et réduction des risques.',
  },
]

export default function ServicesPremium() {
  return (
    <section className="bg-[#F8FAFC] py-28">

      <div className="max-w-[1450px] mx-auto px-6">

        {/* HEADER */}
        <FadeIn>
        <div className="text-center max-w-4xl mx-auto">

          <span className="uppercase tracking-[5px] text-[#D4A63D] font-bold">
            Nos Services
          </span>

          <h2 className="text-5xl md:text-6xl font-extrabold text-[#071739] mt-6 leading-tight">

            Des solutions complètes
            pour réussir vos projets
            en République Centrafricaine

          </h2>

          <p className="text-gray-600 text-xl leading-9 mt-8">
            Nous accompagnons les entreprises,
            investisseurs, institutions et membres
            de la diaspora avec une approche
            stratégique, opérationnelle et sécurisée.
          </p>

        </div>
        </FadeIn>

        {/* GRID */}
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-20">

          {services.map((service, index) => {

            const Icon = service.icon

            return (
              <div
                key={index}
                className="group bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-500"
              >

                {/* ICON */}
                <div className="w-20 h-20 rounded-3xl bg-[#071739] flex items-center justify-center group-hover:bg-[#D4A63D] transition duration-500">

                  <Icon
                    size={36}
                    className="text-white"
                  />

                </div>

                {/* TITLE */}
                <h3 className="text-2xl font-bold text-[#071739] mt-8 leading-snug">
                  {service.title}
                </h3>

                {/* DESC */}
                <p className="text-gray-600 leading-8 mt-5">
                  {service.description}
                </p>

                 <a
  href="/services"
  className="mt-8 inline-block text-[#D4A63D] font-bold hover:translate-x-2 transition"
>
  En savoir plus →
</a>
              </div>
            )
          })}

        </div> 

        {/* CTA */}
        <div className="text-center mt-20">

          <a
            href="/services"
            className="inline-flex items-center bg-[#D4A63D] hover:scale-105 transition px-10 py-5 rounded-2xl font-bold text-[#071739]"
          >
            VOIR TOUS LES SERVICES
          </a>

        </div>

      </div>
    </section>
  )
}