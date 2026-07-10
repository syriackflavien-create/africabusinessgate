'use client'

import Image from 'next/image'
import { useLanguage } from '../../contexts/LanguageContext'
import FadeIn from '../animations/FadeIn'

export default function Hero() {

  const { lang } = useLanguage()

  const content = {
    fr: {
      badge:
        'Votre partenaire stratégique en RCA',

      title1:
        'Votre passerelle stratégique vers les affaires et l’investissement',

      title2:
        'en République Centrafricaine',

      desc:
        'Nous accompagnons les investisseurs, entreprises et partenaires dans la création, la structuration et le développement de leurs activités en RCA et en Afrique.',

      btn1:
        'CRÉER MON ENTREPRISE',

      btn2:
        'DÉCOUVRIR NOS SERVICES',

      opportunities:
        'Opportunités',

      opportunitiesDesc:
        'Secteurs porteurs en croissance',

      expertise:
        'Expertise',

      expertiseDesc:
        'Équipe locale & internationale',

      support:
        'Accompagnement',

      supportDesc:
        'De l’idée à l’exécution',

      network:
        'Réseau solide',

      networkDesc:
        'Partenaires fiables',
    },

    en: {
      badge:
        'Your strategic partner in CAR',

      title1:
        'Your strategic gateway to business and investment',

      title2:
        'in the Central African Republic',

      desc:
        'We support investors, companies and partners in the creation, structuring and development of their activities in CAR and Africa.',

      btn1:
        'CREATE MY COMPANY',

      btn2:
        'DISCOVER OUR SERVICES',

      opportunities:
        'Opportunities',

      opportunitiesDesc:
        'High-growth sectors',

      expertise:
        'Expertise',

      expertiseDesc:
        'Local & international team',

      support:
        'Support',

      supportDesc:
        'From idea to execution',

      network:
        'Strong network',

      networkDesc:
        'Reliable partners',
    },
  }

  const t = content[lang]

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <FadeIn delay={0.3}>
  <div className="relative">
        <Image
          src="/images/hero-bg.jpg"
          alt="Africa Business Gate"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
          </div>
</FadeIn>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-[#071739]/80" />

      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1450px] mx-auto px-6 w-full pt-[120px]">

        <div className="grid xl:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>

            <FadeIn>
              <span className="inline-block bg-[#D4A63D]/20 text-[#D4A63D] px-5 py-2 rounded-full text-sm font-semibold mb-8">
              {t.badge}
            </span>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="text-white text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight">
            
              {t.title1}

              <span className="block text-[#D4A63D] mt-3">
                {t.title2}
              </span>

            </h1>
            </FadeIn>

            <FadeIn delay={0.3}><p className="text-gray-300 text-xl leading-9 mt-8 max-w-3xl">
              {t.desc}
            </p>
            </FadeIn>

            {/* BUTTONS */}
            <FadeIn delay={0.45}><div className="flex flex-wrap gap-5 mt-10">

              <a
                href="/contact"
                className="bg-[#D4A63D] hover:scale-105 transition px-8 py-5 rounded-xl font-bold text-[#071739]"
              >
                {t.btn1}
              </a>

              <a
                href="/services"
                className="border border-white text-white hover:bg-white hover:text-[#071739] transition px-8 py-5 rounded-xl font-bold"
              >
                {t.btn2}
              </a>

            </div>
            </FadeIn>

            {/* TRUST BLOCKS */}
            <div className="grid md:grid-cols-4 gap-5 mt-16">

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">

                <h3 className="text-[#D4A63D] font-bold">
                  {t.opportunities}
                </h3>

                <p className="text-gray-300 text-sm mt-2">
                  {t.opportunitiesDesc}
                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">

                <h3 className="text-[#D4A63D] font-bold">
                  {t.expertise}
                </h3>

                <p className="text-gray-300 text-sm mt-2">
                  {t.expertiseDesc}
                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">

                <h3 className="text-[#D4A63D] font-bold">
                  {t.support}
                </h3>

                <p className="text-gray-300 text-sm mt-2">
                  {t.supportDesc}
                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">

                <h3 className="text-[#D4A63D] font-bold">
                  {t.network}
                </h3>

                <p className="text-gray-300 text-sm mt-2">
                  {t.networkDesc}
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative hidden xl:flex justify-center">

            <div className="relative">

              <Image
                src="/images/rca-map.PNG"
                alt="Carte RCA"
                width={900}
                height={400}
                className="w-full h-[600px]"
                sizes="100vw"
              />

              {/* FLAG */}
              <div className="absolute bottom-0 right-0">

                <Image
                  src="/images/rca-flag.PNG"
                  alt="RCA Flag"
                  width={180}
                  height={180}
                  className="w-full h-[100px]"
                  sizes="100vw"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}