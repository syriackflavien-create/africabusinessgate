import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '../../components/animations/FadeIn'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos',

  description:
    'Découvrez AFRICA BUSINESS GATE – RCA, votre partenaire stratégique pour les affaires et l’investissement en République Centrafricaine.',
}

import {
  Target,
  Eye,
  ShieldCheck,
  Globe2,
  Handshake,
  Building2,
} from 'lucide-react'

const values = [
  {
    icon: ShieldCheck,
    title: 'Fiabilité',
    text: 'Un accompagnement sérieux, structuré et sécurisé.',
  },
  {
    icon: Globe2,
    title: 'Ouverture internationale',
    text: 'Une passerelle entre la RCA, l’Afrique et le monde.',
  },
  {
    icon: Handshake,
    title: 'Partenariat durable',
    text: 'Des relations professionnelles basées sur la confiance.',
  },
  {
    icon: Building2,
    title: 'Expertise locale',
    text: 'Une parfaite compréhension du terrain centrafricain.',
  },
]

export default function AboutPage() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-[120px]">
        <div className="absolute inset-0">
          <Image
            src="/images/about-business.png"
            alt="Africa Business Gate"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#071739]/85" />
        </div>

        <div className="relative z-10 max-w-[1450px] mx-auto px-6 text-center">
          <span className="uppercase tracking-[5px] text-[#D4A63D] font-bold">
            À propos de nous
          </span>

          <FadeIn>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-6 leading-tight">
            Une passerelle stratégique pour les affaires en RCA
          </h1>
            </FadeIn>

           <FadeIn delay={0.2}>
          <p className="text-gray-300 text-xl leading-9 mt-8 max-w-4xl mx-auto">
            AFRICA BUSINESS GATE – RCA accompagne les investisseurs,
            entreprises, institutions et membres de la diaspora dans leurs
            projets d’implantation, de structuration et de développement.
          </p>
          </FadeIn>
        </div>
      </section>

      {/* PRESENTATION */}
      <section className="py-28 bg-[#F8FAFC]">
        <div className="max-w-[1450px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <span className="uppercase tracking-[5px] text-[#D4A63D] font-bold">
              Notre identité
            </span>

            <h2 className="text-4xl md:text-6xl font-extrabold text-[#071739] mt-6 leading-tight">
              Un partenaire local avec une vision internationale
            </h2>

            <p className="text-gray-600 text-lg leading-9 mt-8">
              AFRICA BUSINESS GATE – RCA est une société spécialisée dans
              l’accompagnement des projets économiques, la création
              d’entreprises, le conseil en investissement, la représentation
              locale, les appels d’offres, la domiciliation et la sécurisation
              des relations d’affaires.
            </p>

            <p className="text-gray-600 text-lg leading-9 mt-5">
              Notre rôle est de faciliter l’accès au marché centrafricain,
              réduire les risques opérationnels et permettre aux partenaires
              nationaux et internationaux de développer leurs activités avec
              confiance.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 w-full h-full  rounded-[40px]" />
            <div className="relative overflow-hidden rounded-[40px] shadow-2xl">
              <Image
                src="/images/about-business.PNG"
                alt="Business partnership"
                width={900}
                height={700}
                className="w-full h-[600px] object-cover"
                sizes="100vw"
              />
            </div>
          </div>

        </div>
      </section>

      {/* MISSION VISION */}
      <section className="py-28 bg-white">
        <div className="max-w-[1450px] mx-auto px-6 grid lg:grid-cols-2 gap-10">

          <div className="bg-[#071739] rounded-[40px] p-12 text-white">
            <Target className="text-[#D4A63D]" size={50} />

            <h3 className="text-4xl font-extrabold mt-8">
              Notre mission
            </h3>

            <p className="text-gray-300 text-lg leading-9 mt-6">
              Faciliter l’investissement, l’implantation et le développement
              d’activités économiques en République Centrafricaine grâce à un
              accompagnement fiable, professionnel et sécurisé.
            </p>
          </div>

          <div className="bg-[#F8FAFC] rounded-[40px] p-12 border border-gray-100">
            <Eye className="text-[#D4A63D]" size={50} />

            <h3 className="text-4xl font-extrabold text-[#071739] mt-8">
              Notre vision
            </h3>

            <p className="text-gray-600 text-lg leading-9 mt-6">
              Devenir une plateforme de référence pour les investisseurs,
              entrepreneurs et institutions souhaitant accéder aux opportunités
              économiques en RCA et en Afrique centrale.
            </p>
          </div>

        </div>
      </section>

      {/* VALUES */}
      <section className="py-28 bg-[#F8FAFC]">
        <div className="max-w-[1450px] mx-auto px-6">

          <div className="text-center max-w-4xl mx-auto">
            <span className="uppercase tracking-[5px] text-[#D4A63D] font-bold">
              Nos valeurs
            </span>

            <h2 className="text-5xl md:text-6xl font-extrabold text-[#071739] mt-6">
              Des principes solides pour des projets durables
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {values.map((item, index) => {
              const Icon = item.icon

              return (
                <div
                  key={index}
                  className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#071739] flex items-center justify-center">
                    <Icon className="text-[#D4A63D]" size={30} />
                  </div>

                  <h3 className="text-2xl font-bold text-[#071739] mt-7">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-8 mt-4">
                    {item.text}
                  </p>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#071739]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="uppercase tracking-[5px] text-[#D4A63D] font-bold">
            Travaillons ensemble
          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-6">
            Vous avez un projet en RCA ?
          </h2>

          <p className="text-gray-300 text-lg leading-9 mt-6 max-w-3xl mx-auto">
            Notre équipe vous accompagne dans vos démarches, votre implantation
            et la sécurisation de vos relations d’affaires.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-10 bg-[#D4A63D] px-10 py-5 rounded-2xl font-bold text-[#071739] hover:scale-105 transition"
          >
            NOUS CONTACTER
          </Link>
        </div>
      </section>

    </main>
  )
}