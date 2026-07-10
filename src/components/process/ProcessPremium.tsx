import FadeIn from '../animations/FadeIn'

import {
  SearchCheck,
  ClipboardCheck,
  BriefcaseBusiness,
  ShieldCheck,
} from 'lucide-react'

const steps = [
  {
    icon: SearchCheck,
    number: '01',
    title: 'Analyse & Étude',
    desc: 'Étude approfondie du projet, du marché et des opportunités stratégiques.',
  },
  {
    icon: ClipboardCheck,
    number: '02',
    title: 'Structuration',
    desc: 'Mise en conformité administrative, juridique et opérationnelle.',
  },
  {
    icon: BriefcaseBusiness,
    number: '03',
    title: 'Déploiement',
    desc: 'Accompagnement dans l’implantation et le développement des activités.',
  },
  {
    icon: ShieldCheck,
    number: '04',
    title: 'Suivi & Sécurisation',
    desc: 'Contrôle, assistance continue et sécurisation des investissements.',
  },
]

export default function ProcessPremium() {
  return (
    <section className="bg-[#F8FAFC] py-28 overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto">

          <span className="uppercase tracking-[5px] text-[#D4A63D] font-bold">
            Notre Processus
          </span>

          <h2 className="text-5xl md:text-6xl font-extrabold text-[#071739] mt-6 leading-tight">
            Une approche structurée
            pour sécuriser vos projets
          </h2>

          <p className="text-gray-600 text-xl leading-9 mt-8">
            Nous accompagnons chaque client avec une méthodologie
            claire, efficace et adaptée aux réalités du marché centrafricain.
          </p>

        </div>

        {/* PROCESS */}
        <div className="relative mt-24">

          {/* CENTER LINE */}
          <div className="hidden lg:block absolute left-1/2 top-0 w-1 h-full bg-[#D4A63D]/20 -translate-x-1/2" />

          <div className="space-y-16">

            {steps.map((step, index) => {

              const Icon = step.icon

              const isLeft = index % 2 === 0

              return (
                <FadeIn delay={index * 0.12} key={index}>
                <div
                  key={index}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${
                    !isLeft ? 'lg:text-right' : ''
                  }`}
                >

                  {/* LEFT */}
                  <div
                    className={`${
                      !isLeft ? 'lg:order-2' : ''
                    }`}
                  >

                    <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 hover:shadow-2xl transition duration-500">

                      <div className={`flex items-center gap-5 ${
                        !isLeft ? 'lg:justify-end' : ''
                      }`}>

                        <div className="w-20 h-20 rounded-3xl bg-[#071739] flex items-center justify-center">

                          <Icon
                            size={34}
                            className="text-[#D4A63D]"
                          />

                        </div>

                        <div>

                          <span className="text-[#D4A63D] font-bold text-lg">
                            Étape {step.number}
                          </span>

                          <h3 className="text-3xl font-bold text-[#071739] mt-2">
                            {step.title}
                          </h3>

                        </div>

                      </div>

                      <p className="text-gray-600 leading-8 text-lg mt-8">
                        {step.desc}
                      </p>

                    </div>

                  </div>

                  {/* RIGHT CIRCLE */}
                  <div
                    className={`hidden lg:flex justify-center ${
                      !isLeft ? 'lg:order-1' : ''
                    }`}
                  >

                    <div className="w-28 h-28 rounded-full bg-[#D4A63D] text-[#071739] font-extrabold text-4xl flex items-center justify-center shadow-2xl">
                      {step.number}
                    </div>

                  </div>

                </div></FadeIn>
              )
            })}

          </div>

        </div>

      </div>

    </section>
  )
}