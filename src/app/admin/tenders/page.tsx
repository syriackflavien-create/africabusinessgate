'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  FileText,
  Pencil,
  Trash2,
  X,
} from 'lucide-react'

import {
  createTender,
  getTenders,
  deleteTender,
  updateTender,
} from '../../../services/tenderService'

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

export default function AdminTendersPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [tenders, setTenders] = useState<Tender[]>([])
  const [editingTender, setEditingTender] = useState<Tender | null>(null)

  function loadTenders() {
    getTenders().then((res) => {
      if (res.success) {
        setTenders(res.data)
      }
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('abg_admin_token')

    if (!token) {
      router.push('/admin/login')
      return
    }

    loadTenders()
  }, [router])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const res = editingTender
      ? await updateTender(formData)
      : await createTender(formData)

    if (res.success) {
      alert(editingTender ? 'Appel d’offres modifié' : 'Appel d’offres créé')
      form.reset()
      setEditingTender(null)
      loadTenders()
    } else {
      alert(res.message || 'Erreur')
    }

    setLoading(false)
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm(
      'Voulez-vous vraiment supprimer cet appel d’offres ?'
    )

    if (!confirmDelete) return

    const res = await deleteTender(id)

    if (res.success) {
      alert('Appel d’offres supprimé')
      loadTenders()
    } else {
      alert(res.message || 'Erreur suppression')
    }
  }

  return (
    <main className="min-h-screen bg-[#F3F6FA] p-8">
      <div className="max-w-7xl mx-auto">

        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-[#071739] font-bold mb-8"
        >
          <ArrowLeft size={20} />
          Retour dashboard
        </Link>

        <div className="bg-[#071739] text-white rounded-[35px] p-10 mb-8">
          <p className="uppercase tracking-[4px] text-[#D4A63D] font-bold">
            Administration
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Appels d’offres
          </h1>

          <p className="text-gray-300 mt-4">
            Publiez, modifiez et supprimez les opportunités disponibles.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100 space-y-5"
          >
            <div className="flex justify-between items-center gap-4">
              <h2 className="text-2xl font-extrabold text-[#071739]">
                {editingTender
                  ? 'Modifier l’appel d’offres'
                  : 'Nouvel appel d’offres'}
              </h2>

              {editingTender && (
                <button
                  type="button"
                  onClick={() => setEditingTender(null)}
                  className="text-red-500 flex items-center gap-2 font-bold"
                >
                  <X size={18} />
                  Annuler
                </button>
              )}
            </div>

            {editingTender && (
              <input
                type="hidden"
                name="id"
                value={editingTender.id}
              />
            )}

            <input
              name="title"
              placeholder="Titre"
              defaultValue={editingTender?.title || ''}
              className="w-full border rounded-2xl px-5 py-4"
              required
            />

            <input
              name="reference"
              placeholder="Référence"
              defaultValue={editingTender?.reference || ''}
              className="w-full border rounded-2xl px-5 py-4"
            />

            <input
              name="sector"
              placeholder="Secteur"
              defaultValue={editingTender?.sector || ''}
              className="w-full border rounded-2xl px-5 py-4"
            />

            <input
              name="deadline"
              type="date"
              defaultValue={editingTender?.deadline || ''}
              className="w-full border rounded-2xl px-5 py-4"
            />

            <select
              name="status"
              defaultValue={editingTender?.status || 'open'}
              className="w-full border rounded-2xl px-5 py-4"
            >
              <option value="open">Ouvert</option>
              <option value="closed">Fermé</option>
            </select>

            <textarea
              name="description"
              rows={6}
              placeholder="Description"
              defaultValue={editingTender?.description || ''}
              className="w-full border rounded-2xl px-5 py-4"
              required
            />

            {!editingTender && (
              <input
                name="document"
                type="file"
                accept="application/pdf"
                className="w-full border rounded-2xl px-5 py-4 bg-white"
              />
            )}

            {editingTender && (
              <p className="text-sm text-gray-500">
                Le fichier PDF n’est pas modifié ici pour le moment.
              </p>
            )}

            <button
              disabled={loading}
              className="w-full bg-[#D4A63D] text-[#071739] py-4 rounded-2xl font-bold"
            >
              {loading
                ? 'Enregistrement...'
                : editingTender
                  ? 'Modifier'
                  : 'Publier'}
            </button>
          </form>

          <div className="space-y-5">
            {tenders.length === 0 ? (
              <div className="bg-white rounded-[30px] p-8 text-gray-500">
                Aucun appel d’offres publié.
              </div>
            ) : (
              tenders.map((tender) => (
                <div
                  key={tender.id}
                  className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#071739] text-[#D4A63D] flex items-center justify-center shrink-0">
                      <FileText />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-extrabold text-[#071739]">
                        {tender.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Réf: {tender.reference || 'N/A'} | Secteur:{' '}
                        {tender.sector || 'N/A'}
                      </p>

                      <p className="text-gray-600 mt-3 leading-7">
                        {tender.description}
                      </p>

                      <p className="text-sm mt-4">
                        Date limite :{' '}
                        <strong>
                          {tender.deadline || 'Non précisée'}
                        </strong>
                      </p>

                      <span
                        className={`inline-block mt-3 px-4 py-2 rounded-full text-sm ${
                          tender.status === 'open'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {tender.status === 'open' ? 'Ouvert' : 'Fermé'}
                      </span>

                      {tender.document && (
                        <a
                          href={`http://localhost/abg-api/${tender.document}`}
                          target="_blank"
                          className="block mt-4 text-[#D4A63D] font-bold"
                        >
                          Voir le PDF
                        </a>
                      )}

                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => setEditingTender(tender)}
                          className="flex items-center gap-2 bg-[#071739] text-white px-5 py-3 rounded-xl font-bold"
                        >
                          <Pencil size={18} />
                          Modifier
                        </button>

                        <button
                          onClick={() => handleDelete(tender.id)}
                          className="flex items-center gap-2 bg-red-100 text-red-600 px-5 py-3 rounded-xl font-bold"
                        >
                          <Trash2 size={18} />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </main>
  )
}