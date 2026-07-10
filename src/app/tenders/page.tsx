'use client'

import { useEffect, useState } from 'react'
import { FileText, CalendarDays, Building2, Search } from 'lucide-react'
import { getTenders } from '../../services/tenderService'

type Tender = {
  id: number
  title: string
  reference: string
  sector: string
  description: string
  deadline: string
  status: string
  document: string
  created_at: string
}

export default function PublicTendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getTenders().then((res) => {
      if (res.success) {
        setTenders(res.data)
      }
    })
  }, [])

  const filteredTenders = tenders.filter((tender) =>
    `${tender.title} ${tender.reference} ${tender.sector}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <main className="bg-[#F8FAFC] min-h-screen">

      <section className="bg-[#071739] pt-44 pb-24 text-white">
        <div className="max-w-[1450px] mx-auto px-6 text-center">

          <span className="uppercase tracking-[5px] text-[#D4A63D] font-bold">
            Opportunités
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mt-6">
            Appels d’offres
          </h1>

          <p className="text-gray-300 text-xl leading-9 mt-8 max-w-3xl mx-auto">
            Consultez les opportunités publiques et privées publiées par
            AFRICA BUSINESS GATE – RCA.
          </p>

        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1450px] mx-auto px-6">

          <div className="bg-white rounded-[30px] shadow-sm p-5 flex items-center gap-4 mb-12">
            <Search className="text-[#D4A63D]" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par titre, référence ou secteur..."
              className="w-full outline-none text-gray-700"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {filteredTenders.length === 0 ? (
              <div className="bg-white rounded-[30px] p-10 text-gray-500 lg:col-span-2">
                Aucun appel d’offres disponible pour le moment.
              </div>
            ) : (
              filteredTenders.map((tender) => (
                <div
                  key={tender.id}
                  className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-[#071739] text-[#D4A63D] flex items-center justify-center shrink-0">
                      <FileText size={30} />
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="px-4 py-2 rounded-full text-sm bg-[#D4A63D]/20 text-[#071739] font-bold">
                          {tender.sector || 'Général'}
                        </span>

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold ${
                            tender.status === 'open'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {tender.status === 'open' ? 'Ouvert' : 'Fermé'}
                        </span>
                      </div>

                      <h2 className="text-2xl font-extrabold text-[#071739]">
                        {tender.title}
                      </h2>

                      <p className="text-gray-500 mt-3">
                        Référence : {tender.reference || 'N/A'}
                      </p>

                      <p className="text-gray-600 leading-8 mt-5">
                        {tender.description}
                      </p>

                      <div className="flex flex-wrap gap-6 mt-6 text-gray-600">
                        <p className="flex items-center gap-2">
                          <CalendarDays size={18} />
                          Date limite : {tender.deadline || 'Non précisée'}
                        </p>

                        <p className="flex items-center gap-2">
                          <Building2 size={18} />
                          {tender.sector || 'Secteur non précisé'}
                        </p>
                      </div>

                      {tender.document ? (
  <a
    href={`http://localhost/abg-api/${tender.document}`}
    target="_blank"
    className="inline-block mt-8 bg-[#071739] text-white px-7 py-4 rounded-2xl font-bold hover:bg-[#D4A63D] hover:text-[#071739] transition"
  >
    Télécharger le dossier PDF
  </a>
) : (
  <a
    href="/contact"
    className="inline-block mt-8 bg-[#071739] text-white px-7 py-4 rounded-2xl font-bold hover:bg-[#D4A63D] hover:text-[#071739] transition"
  >
    Demander le dossier
  </a>
)}
                    
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

    </main>
  )
}