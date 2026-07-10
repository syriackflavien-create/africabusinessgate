'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Newspaper,
  Pencil,
  Trash2,
  X,
} from 'lucide-react'

import {
  createNews,
  getNews,
  deleteNews,
  updateNews,
} from '../../../services/newsService'

type NewsPost = {
  id: number
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  image: string
  status: string
  created_at: string
}

export default function AdminNewsPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null)

  function loadNews() {
    getNews().then((res) => {
      if (res.success) {
        setPosts(res.data)
      }
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('abg_admin_token')

    if (!token) {
      router.push('/admin/login')
      return
    }

    loadNews()
  }, [router])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const res = editingPost
      ? await updateNews(formData)
      : await createNews(formData)

    if (res.success) {
      alert(editingPost ? 'Actualité modifiée' : 'Actualité publiée')
      form.reset()
      setEditingPost(null)
      loadNews()
    } else {
      alert(res.message || 'Erreur')
    }

    setLoading(false)
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm(
      'Voulez-vous vraiment supprimer cette actualité ?'
    )

    if (!confirmDelete) return

    const res = await deleteNews(id)

    if (res.success) {
      alert('Actualité supprimée')
      loadNews()
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
            Actualités
          </h1>

          <p className="text-gray-300 mt-4">
            Publiez, modifiez et supprimez les actualités visibles sur le site.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100 space-y-5"
          >
            <div className="flex justify-between items-center gap-4">
              <h2 className="text-2xl font-extrabold text-[#071739]">
                {editingPost
                  ? 'Modifier l’actualité'
                  : 'Nouvelle actualité'}
              </h2>

              {editingPost && (
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="text-red-500 flex items-center gap-2 font-bold"
                >
                  <X size={18} />
                  Annuler
                </button>
              )}
            </div>

            {editingPost && (
              <input
                type="hidden"
                name="id"
                value={editingPost.id}
              />
            )}

            <input
              name="title"
              placeholder="Titre de l’actualité"
              defaultValue={editingPost?.title || ''}
              className="w-full border rounded-2xl px-5 py-4"
              required
            />

            <input
              name="category"
              placeholder="Catégorie"
              defaultValue={editingPost?.category || ''}
              className="w-full border rounded-2xl px-5 py-4"
            />

            <textarea
              name="excerpt"
              rows={3}
              placeholder="Résumé court"
              defaultValue={editingPost?.excerpt || ''}
              className="w-full border rounded-2xl px-5 py-4"
            />

            <textarea
              name="content"
              rows={8}
              placeholder="Contenu complet"
              defaultValue={editingPost?.content || ''}
              className="w-full border rounded-2xl px-5 py-4"
              required
            />

            {!editingPost && (
              <input
                name="image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="w-full border rounded-2xl px-5 py-4 bg-white"
              />
            )}

            {editingPost && (
              <p className="text-sm text-gray-500">
                L’image n’est pas modifiée ici pour le moment.
              </p>
            )}

            <select
              name="status"
              defaultValue={editingPost?.status || 'published'}
              className="w-full border rounded-2xl px-5 py-4"
            >
              <option value="published">Publié</option>
              <option value="draft">Brouillon</option>
            </select>

            <button
              disabled={loading}
              className="w-full bg-[#D4A63D] text-[#071739] py-4 rounded-2xl font-bold"
            >
              {loading
                ? 'Enregistrement...'
                : editingPost
                  ? 'Modifier'
                  : 'Publier l’actualité'}
            </button>
          </form>

          <div className="space-y-5">
            {posts.length === 0 ? (
              <div className="bg-white rounded-[30px] p-8 text-gray-500">
                Aucune actualité publiée.
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#071739] text-[#D4A63D] flex items-center justify-center shrink-0">
                      <Newspaper />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-extrabold text-[#071739]">
                        {post.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Catégorie : {post.category || 'Non précisée'} | Statut : {post.status}
                      </p>

                      <p className="text-gray-600 mt-3 leading-7">
                        {post.excerpt || post.content.slice(0, 140) + '...'}
                      </p>

                      {post.image && (
                        <a
                          href={`http://localhost/abg-api/${post.image}`}
                          target="_blank"
                          className="inline-block mt-4 text-[#D4A63D] font-bold"
                        >
                          Voir l’image
                        </a>
                      )}

                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => setEditingPost(post)}
                          className="flex items-center gap-2 bg-[#071739] text-white px-5 py-3 rounded-xl font-bold"
                        >
                          <Pencil size={18} />
                          Modifier
                        </button>

                        <button
                          onClick={() => handleDelete(post.id)}
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