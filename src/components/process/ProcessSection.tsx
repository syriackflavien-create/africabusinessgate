const processSteps = [
  {
    number: '01',
    title: 'Analyse du projet',
    description:
      'Nous étudions votre besoin, votre secteur et vos objectifs d’investissement ou d’implantation.',
  },
  {
    number: '02',
    title: 'Étude & stratégie',
    description:
      'Nous identifions les opportunités, contraintes réglementaires et partenaires adaptés.',
  },
  {
    number: '03',
    title: 'Mise en œuvre',
    description:
      'Création d’entreprise, représentation, formalités administratives et exécution opérationnelle.',
  },
  {
    number: '04',
    title: 'Suivi & sécurisation',
    description:
      'Nous assurons un accompagnement continu pour sécuriser et développer votre activité.',
  },
]

export default function ProcessSection() {
  return (
    <section className="bg-[#F8FAFC] py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">

          <span className="uppercase tracking-widest text-[#D4A63D] font-semibold">
            Notre Processus
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#071739] mt-4">
            Comment nous accompagnons votre projet
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
            Une méthodologie claire et professionnelle
            pour garantir la réussite de vos investissements
            et opérations en République Centrafricaine.
          </p>

        </div>

        {/* PROCESS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {processSteps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >

              {/* NUMBER */}
              <div className="absolute top-5 right-5 text-5xl font-bold text-[#D4A63D]/20">
                {step.number}
              </div>

              {/* STEP NUMBER */}
              <div className="w-14 h-14 rounded-full bg-[#071739] text-white flex items-center justify-center font-bold text-lg mb-6">
                {step.number}
              </div>

              <h3 className="text-2xl font-bold text-[#071739]">
                {step.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}