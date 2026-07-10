'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Phone, Building2, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getContactRequests } from '../../../services/contactAdminService'

type ContactRequest = {
  id: number
  fullname: string
  email: string
  company: string
  phone: string
  service: string
  message: string
  created_at: string
}

export default function AdminContactsPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<ContactRequest[]>([])

  useEffect(() => {
    const token = localStorage.getItem('abg_admin_token')

    if (!token) {
      router.push('/admin/login')
      return
    }

    getContactRequests().then((res) => {
      if (res.success) {
        setContacts(res.data)
      }
    })
  }, [router])

  return (
    <main className="min-h-screen bg-[#F3F6FA] p-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-[#071739] font-bold"
          >
            <ArrowLeft size={20} />
            Retour dashboard
          </Link>
        </div>

        <div className="bg-[#071739] text-white rounded-[35px] p-10 mb-8">
          <p className="uppercase tracking-[4px] text-[#D4A63D] font-bold">
            Administration
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Demandes de contact
          </h1>

          <p className="text-gray-300 mt-4">
            Liste des demandes envoyées depuis le formulaire du site.
          </p>
        </div>

        <div className="grid gap-6">
          {contacts.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-gray-500">
              Aucune demande de contact pour le moment.
            </div>
          ) : (
            contacts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[28px] p-7 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#071739] flex items-center gap-3">
                      <User className="text-[#D4A63D]" />
                      {item.fullname}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4 mt-5 text-gray-600">
                      <p className="flex items-center gap-2">
                        <Mail size={18} />
                        {item.email}
                      </p>

                      <p className="flex items-center gap-2">
                        <Phone size={18} />
                        {item.phone || 'Non renseigné'}
                      </p>

                      <p className="flex items-center gap-2">
                        <Building2 size={18} />
                        {item.company || 'Non renseignée'}
                      </p>

                      <p>
                        <strong>Service :</strong> {item.service || 'Non précisé'}
                      </p>
                    </div>

                    <p className="mt-6 text-gray-700 leading-8">
                      {item.message || 'Aucun message'}
                    </p>
                  </div>

                  <div className="text-sm text-gray-400">
                    {item.created_at}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  )
}