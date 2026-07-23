import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '../animations/FadeIn'
import Script from "next/script";

export default function AboutSection() {
  return (
    <section className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <span className="inline-block text-[#D4A63D] font-bold uppercase tracking-widest mb-5">
              À propos de nous
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#071739] leading-tight">

              Votre partenaire stratégique
              pour réussir vos projets
              en République Centrafricaine

            </h2>

            <FadeIn><div className="w-28 h-1 bg-[#D4A63D] mt-6 rounded-full" />

            <p className="text-gray-700 text-lg leading-9 mt-8">
              AFRICA BUSINESS GATE – RCA accompagne les
              investisseurs, entreprises, organisations
              et membres de la diaspora dans leurs projets
              de création, structuration et développement
              d’activités économiques en République
              Centrafricaine.
            </p>

            <p className="text-gray-700 text-lg leading-9 mt-5">
              Notre mission est de faciliter les affaires,
              réduire les risques opérationnels et offrir
              un accompagnement local fiable aux partenaires
              nationaux et internationaux.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-5 mt-10">

              <div className="bg-[#F7F8FA] p-6 rounded-2xl border border-gray-100 shadow-sm">

                <h3 className="text-4xl font-extrabold text-[#D4A63D]">
                  360°
                </h3>

                <p className="text-[#071739] font-semibold mt-2">
                  Accompagnement complet
                </p>

              </div>

              <div className="bg-[#F7F8FA] p-6 rounded-2xl border border-gray-100 shadow-sm">

                <h3 className="text-4xl font-extrabold text-[#D4A63D]">
                  OHADA
                </h3>

                <p className="text-[#071739] font-semibold mt-2">
                  Expertise réglementaire
                </p>

              </div>

            </div>

            {/* BUTTON */}
            <div className="mt-10">

              <Link
                href="/about"
                className="inline-flex items-center bg-[#D4A63D] hover:scale-105 transition px-8 py-5 rounded-xl font-bold text-[#071739]"
              >
                EN SAVOIR PLUS
              </Link>

            </div></FadeIn>

          </div>

          {/* RIGHT */}
          <div className="relative">

            {/* GOLD BORDER EFFECT */}
            <div className="absolute -top-6 -left-6 w-full h-full  rounded-[40px]" />

            <div className="relative rounded-[40px] overflow-hidden shadow-2xl">

            <FadeIn delay={0.25}>
            <div className="relative">
              <Image
                public="/images/image_A.png"
                alt="About Africa Business Gate"
                width={800}
                height={700}
                className="object-cover w-full h-[600px]"
              />
              </div>
            </FadeIn>
            
            </div>

          </div>

        </div>
         <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="afterInteractive"
      />

      <div
        className="badge-base LI-profile-badge"
        data-locale="fr_FR"
        data-size="large"
        data-theme="light"
        data-type="VERTICAL"
        data-vanity="syriack-flavien-ndamassingba-mbolipatirani-9a7824286"
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link"
          href="https://cf.linkedin.com/in/syriack-flavien-ndamassingba-mbolipatirani-9a7824286"
        >
          Syriack Flavien NDAMASSINGBA MBOLIPATIRANI
        </a>
      </div>
      </div>
    </section>
  )
}