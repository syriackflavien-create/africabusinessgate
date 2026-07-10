'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CalendarDays, Newspaper, Search } from 'lucide-react'
import { getNews } from '../../services/newsService'

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

export default function PublicNewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getNews().then((res) => {
      if (res.success) {
        setPosts(res.data.filter((post: NewsPost) => post.status === 'published'))
      }
    })
  }, [])

  const filteredPosts = posts.filter((post) =>
    `${post.title} ${post.category} ${post.excerpt}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <main className="bg-[#F8FAFC] min-h-screen">

      <section className="bg-[#071739] pt-44 pb-24 text-white">
        <div className="max-w-[1450px] mx-auto px-6 text-center">
          <span className="uppercase tracking-[5px] text-[#D4A63D] font-bold">
            Actualités
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mt-6">
            News & Insights
          </h1>

          <p className="text-gray-300 text-xl leading-9 mt-8 max-w-3xl mx-auto">
            Suivez les actualités, analyses économiques, opportunités et informations liées aux affaires en République Centrafricaine.
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
              placeholder="Rechercher une actualité..."
              className="w-full outline-none text-gray-700"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-[30px] p-10 text-gray-500 lg:col-span-3">
                Aucune actualité disponible pour le moment.
              </div>
            ) : (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition"
                >
                  <div className="relative h-64 bg-[#071739]">
                    {post.image ? (
                      <Image
                        src={`http://localhost/abg-api/${post.image}`}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-[#D4A63D]">
                        <Newspaper size={60} />
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between gap-4 mb-5 text-sm text-gray-500">
                      <span className="text-[#D4A63D] font-bold">
                        {post.category || 'Business'}
                      </span>

                      <span className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        {post.created_at}
                      </span>
                    </div>

                    <h2 className="text-2xl font-extrabold text-[#071739] leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 leading-8 mt-4">
                      {post.excerpt || post.content.slice(0, 150) + '...'}
                    </p>

                    <a
                      href={`/news/${post.slug}`}
                      className="inline-block mt-7 text-[#D4A63D] font-bold"
                    >
                      Lire la suite →
                    </a>
                  </div>
                </article>
              ))
            )}
          </div>

        </div>
      </section>

    </main>
  )
}