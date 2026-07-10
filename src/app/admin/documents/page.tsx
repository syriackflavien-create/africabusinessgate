'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import {
  ArrowLeft,
  Upload,
  FileText,
  Download,
  User,
  Calendar,
  Trash2,
  Pencil,
  X,
} from 'lucide-react'

import {
  getAdminClients,
  uploadClientDocument,
  getAdminDocuments,
  deleteClientDocument,
  updateClientDocument,
} from '../../../services/adminDocumentService'

type Client = {
  id: number
  fullname: string
  email: string
  phone: string
  company: string
  status: string
  created_at: string
}

type AdminDocument = {
  id: number
  title: string
  type: string
  file_path: string
  status: string
  created_at: string
  client_name: string
  client_email: string
}

export default function AdminDocumentsPage() {
  const router = useRouter()

  const [clients, setClients] = useState<Client[]>([])
  const [documents, setDocuments] = useState<AdminDocument[]>([])
  const [loading, setLoading] = useState(false)
  const [editingDocument, setEditingDocument] = useState<AdminDocument | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('abg_admin_token')

    if (!token) {
      router.push('/admin/login')
      return
    }

    loadData()
  }, [router])

  async function loadData() {
    const clientsRes = await getAdminClients()
    const documentsRes = await getAdminDocuments()

    if (clientsRes.success) {
      setClients(clientsRes.data)
    }

    if (documentsRes.success) {
      setDocuments(documentsRes.data)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const res = editingDocument
      ? await updateClientDocument(formData)
      : await uploadClientDocument(formData)

    if (res.success) {
      alert(editingDocument ? 'Document modifié' : 'Document envoyé au client')
      form.reset()
      setEditingDocument(null)
      loadData()
    } else {
      alert(res.message || 'Erreur')
    }

    setLoading(false)
  }

  async function handleDeleteDocument(id: number) {
    const confirmDelete = confirm('Voulez-vous vraiment supprimer ce document ?')

    if (!confirmDelete) return

    const res = await deleteClientDocument(id)

    if (res.success) {
      alert('Document supprimé')
      loadData()
    } else {
      alert(res.message || 'Erreur suppression')
    }
  }

  function cancelEdit() {
    setEditingDocument(null)
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
            Documents clients
          </h1>

          <p className="text-gray-300 mt-4">
            Envoyez, modifiez, remplacez et supprimez les documents associés aux clients.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100 space-y-5"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-extrabold text-[#071739]">
                {editingDocument ? 'Modifier le document' : 'Envoyer un document'}
              </h2>

              {editingDocument && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="inline-flex items-center gap-2 text-red-600 font-bold"
                >
                  <X size={18} />
                  Annuler
                </button>
              )}
            </div>

            {editingDocument && (
              <input
                type="hidden"
                name="id"
                value={editingDocument.id}
              />
            )}

            {!editingDocument && (
              <select
                name="client_id"
                className="w-full border rounded-2xl px-5 py-4"
                required
              >
                <option value="">Sélectionner un client</option>

                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.fullname} — {client.email}
                  </option>
                ))}
              </select>
            )}

            {editingDocument && (
              <div className="bg-[#F8FAFC] rounded-2xl p-4 text-sm text-gray-600">
                Client : <strong>{editingDocument.client_name}</strong> — {editingDocument.client_email}
              </div>
            )}

            <input
              name="title"
              placeholder="Titre du document"
              defaultValue={editingDocument?.title || ''}
              className="w-full border rounded-2xl px-5 py-4"
              required
            />

            <select
              name="type"
              defaultValue={editingDocument?.type || 'PDF'}
              className="w-full border rounded-2xl px-5 py-4"
            >
              <option value="PDF">PDF</option>
              <option value="Word">Word</option>
              <option value="Excel">Excel</option>
              <option value="Image">Image</option>
              <option value="Autre">Autre</option>
            </select>

            {editingDocument && (
              <select
                name="status"
                defaultValue={editingDocument.status || 'available'}
                className="w-full border rounded-2xl px-5 py-4"
              >
                <option value="available">Disponible</option>
                <option value="archived">Archivé</option>
              </select>
            )}

            <input
              name="document"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp"
              className="w-full border rounded-2xl px-5 py-4 bg-white"
              required={!editingDocument}
            />

            {editingDocument && (
              <p className="text-sm text-gray-500">
                Laissez vide si vous ne voulez pas remplacer le fichier actuel.
              </p>
            )}

            <button
              disabled={loading}
              className="w-full bg-[#D4A63D] text-[#071739] py-4 rounded-2xl font-bold flex justify-center items-center gap-3"
            >
              <Upload size={20} />
              {loading
                ? 'Enregistrement...'
                : editingDocument
                  ? 'Modifier le document'
                  : 'Envoyer au client'}
            </button>
          </form>

          <div className="space-y-5">
            {documents.length === 0 ? (
              <div className="bg-white rounded-[30px] p-8 text-gray-500">
                Aucun document envoyé pour le moment.
              </div>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#071739] text-[#D4A63D] flex items-center justify-center shrink-0">
                      <FileText />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-extrabold text-[#071739]">
                        {doc.title}
                      </h3>

                      <p className="text-gray-500 mt-2 flex items-center gap-2">
                        <User size={17} />
                        {doc.client_name || 'Client inconnu'} — {doc.client_email}
                      </p>

                      <p className="text-gray-500 mt-2 flex items-center gap-2">
                        <Calendar size={17} />
                        {doc.created_at}
                      </p>

                      <p className="mt-3">
                        <span className="inline-block px-4 py-2 rounded-full text-sm bg-green-100 text-green-700 font-bold">
                          {doc.status}
                        </span>

                        <span className="inline-block ml-2 px-4 py-2 rounded-full text-sm bg-[#D4A63D]/20 text-[#071739] font-bold">
                          {doc.type}
                        </span>
                      </p>

                      <div className="flex flex-wrap gap-4 mt-5">
                        <a
                          href={`http://localhost/abg-api/${doc.file_path}`}
                          target="_blank"
                          className="inline-flex items-center gap-2 text-[#D4A63D] font-bold"
                        >
                          <Download size={18} />
                          Télécharger / voir
                        </a>

                        <button
                          type="button"
                          onClick={() => setEditingDocument(doc)}
                          className="inline-flex items-center gap-2 text-[#071739] font-bold"
                        >
                          <Pencil size={18} />
                          Modifier
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="inline-flex items-center gap-2 text-red-600 font-bold"
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