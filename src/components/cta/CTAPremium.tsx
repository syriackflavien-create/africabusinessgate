import { ArrowRight, PhoneCall } from 'lucide-react'
import FadeIn from '../animations/FadeIn'

export default function CTAPremium() {
  return (
    <section className="bg-[#071739] py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A63D]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-[1450px] mx-auto px-6">
        <FadeIn>
        <div className="rounded-[45px] border border-white/10 bg-white/10 backdrop-blur-md p-10 md:p-20 text-center">

          <span className="uppercase tracking-[5px] text-[#D4A63D] font-bold">
            Passons à l’action
          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-6 leading-tight">
            Vous avez un projet en République Centrafricaine ?
          </h2>

          <p className="text-gray-300 text-lg md:text-xl leading-9 mt-8 max-w-4xl mx-auto">
            AFRICA BUSINESS GATE – RCA vous accompagne dans la création,
            l’implantation, la représentation locale et la sécurisation
            de vos investissements.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-[#D4A63D] px-9 py-5 rounded-2xl font-bold text-[#071739] hover:scale-105 transition"
            >
              DEMANDER UNE CONSULTATION
              <ArrowRight size={20} />
            </a>

            <a
              href="tel:+23672165327"
              className="inline-flex items-center justify-center gap-3 border border-white/20 px-9 py-5 rounded-2xl font-bold text-white hover:bg-white hover:text-[#071739] transition"
            >
              APPELER MAINTENANT
              <PhoneCall size={20} />
            </a>
          </div>

        </div></FadeIn>
      </div>
    </section>
  )
}