'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, ArrowLeft } from 'lucide-react'
import { getSingleNews } from '../../../services/newsService'

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

export default function SingleNewsPage() {
  const params = useParams()

  const [post, setPost] = useState<NewsPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.slug) return

    getSingleNews(params.slug as string).then((res) => {
      if (res.success) {
        setPost(res.data)
      }

      setLoading(false)
    })
  }, [params.slug])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-[#071739] text-2xl font-bold">
          Chargement...
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-red-500 text-2xl font-bold">
          Article introuvable
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#F8FAFC] min-h-screen">

      {/* HERO */}
      <section className="relative h-[70vh] overflow-hidden">

        {post.image ? (
          <Image
            src={`http://localhost/abg-api/${post.image}`}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-[#071739]" />
        )}

        <div className="absolute inset-0 bg-[#071739]/75" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 h-full flex flex-col justify-center">

          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[#D4A63D] font-bold mb-8"
          >
            <ArrowLeft size={20} />
            Retour aux actualités
          </Link>

          <span className="inline-block bg-[#D4A63D] text-[#071739] px-5 py-2 rounded-full font-bold w-fit">
            {post.category || 'Business'}
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-gray-300 mt-8">
            <CalendarDays size={20} />
            {post.created_at}
          </div>

        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24">
        <div className="max-w-[1000px] mx-auto px-6">

          <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-10 md:p-16">

            {post.excerpt && (
              <p className="text-2xl text-[#071739] font-medium leading-10 mb-10">
                {post.excerpt}
              </p>
            )}

            <div className="prose prose-lg max-w-none text-gray-700 leading-9">
              {post.content}
            </div>

          </div>

        </div>
      </section>

    </main>
  )
}