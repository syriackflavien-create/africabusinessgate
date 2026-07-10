'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import {
  ArrowLeft,
  FileText,
  Download,
  Calendar,
  FolderOpen
} from 'lucide-react'

import { getClientDocuments } from '../../../services/clientDocumentService'

type Document = {
  id: number
  title: string
  type: string
  file_path: string
  status: string
  created_at: string
}

export default function ClientDocumentsPage() {

  const router = useRouter()

  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const token = localStorage.getItem('abg_client_token')

    if (!token) {
      router.push('/client/login')
      return
    }

    loadDocuments()

  }, [])

  async function loadDocuments() {

    const res = await getClientDocuments()

    if (res.success) {
      setDocuments(res.data)
    }

    setLoading(false)

  }

  return (

    <main className="min-h-screen bg-[#F4F7FB]">

      <div className="max-w-7xl mx-auto py-12 px-6">

        <Link
          href="/client/dashboard"
          className="inline-flex items-center gap-2 text-[#071739] font-bold mb-8"
        >
          <ArrowLeft size={20} />
          Retour au Dashboard
        </Link>

        <div className="bg-[#071739] rounded-[35px] text-white p-10 mb-10">

          <p className="uppercase tracking-[4px] text-[#D4A63D] font-bold">
            Espace Client
          </p>

          <h1 className="text-5xl font-extrabold mt-4">
            Mes documents
          </h1>

          <p className="text-gray-300 mt-4 max-w-2xl">
            Retrouvez ici tous les documents mis à votre disposition par AFRICA BUSINESS GATE.
          </p>

        </div>

        {loading ? (

          <div className="bg-white rounded-3xl p-12 text-center shadow">

            Chargement...

          </div>

        ) : documents.length === 0 ? (

          <div className="bg-white rounded-3xl p-12 text-center shadow">

            <FolderOpen
              size={60}
              className="mx-auto text-[#D4A63D]"
            />

            <h2 className="text-2xl font-bold mt-6 text-[#071739]">
              Aucun document disponible
            </h2>

            <p className="text-gray-500 mt-3">
              Les documents envoyés par votre conseiller apparaîtront ici.
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-2 gap-8">

            {documents.map((doc) => (

              <div
                key={doc.id}
                className="bg-white rounded-[30px] shadow p-8 hover:shadow-xl transition"
              >

                <div className="flex justify-between">

                  <div>

                    <div className="w-16 h-16 rounded-2xl bg-[#071739] flex items-center justify-center text-[#D4A63D]">

                      <FileText size={30} />

                    </div>

                  </div>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">

                    {doc.status}

                  </span>

                </div>

                <h2 className="text-2xl font-bold mt-6 text-[#071739]">

                  {doc.title}

                </h2>

                <p className="text-gray-500 mt-2">

                  {doc.type}

                </p>

                <div className="flex items-center gap-2 text-gray-500 mt-5">

                  <Calendar size={18} />

                  {doc.created_at}

                </div>

                <a

                  href={`http://localhost/abg-api/${doc.file_path}`}

                  target="_blank"

                  className="mt-8 flex justify-center items-center gap-3 bg-[#D4A63D] text-[#071739] py-4 rounded-2xl font-bold"

                >

                  <Download size={20} />

                  Télécharger

                </a>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>

  )

}