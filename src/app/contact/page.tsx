'use client'

import { useState } from 'react'
import { sendContact } from '../../services/contactService'

export default function ContactPage() {

  const [loading, setLoading] = useState(false)

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const response = await sendContact(formData)

    if (response.success) {
      alert('Demande envoyée avec succès')
      form.reset()
    } else {
      alert('Erreur lors de l’envoi')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-28">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">

          <span className="uppercase tracking-[4px] text-[#D4A63D] font-semibold">
            Contact
          </span>

          <h1 className="text-5xl font-bold text-[#071739] mt-5">
            Parlons de votre projet
          </h1>

        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[40px] shadow-lg p-10 max-w-4xl mx-auto space-y-5"
        >

          <input
            name="fullname"
            placeholder="Nom complet"
            className="w-full border rounded-2xl px-5 py-4"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border rounded-2xl px-5 py-4"
            required
          />

          <input
            name="company"
            placeholder="Entreprise"
            className="w-full border rounded-2xl px-5 py-4"
          />

          <input
            name="phone"
            placeholder="Téléphone"
            className="w-full border rounded-2xl px-5 py-4"
          />

          <select
            name="service"
            className="w-full border rounded-2xl px-5 py-4"
          >
            <option>Type de service</option>
            <option>Création d’entreprise</option>
            <option>Conseil investissement</option>
            <option>Appels d’offres</option>
          </select>

          <textarea
            name="message"
            rows={6}
            placeholder="Décrivez votre projet..."
            className="w-full border rounded-2xl px-5 py-4"
          />

          <button
            disabled={loading}
            className="w-full bg-[#D4A63D] py-5 rounded-2xl font-bold"
          >
            {loading
              ? 'Envoi...'
              : 'Envoyer la demande'}
          </button>

        </form>

      </div>

    </main>
  )
}