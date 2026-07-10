'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loginClient } from '../../../services/clientAuthService'

export default function ClientLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const res = await loginClient(formData)

    if (res.success) {
      localStorage.removeItem('abg_admin_token')
      localStorage.removeItem('abg_admin')

      localStorage.setItem('abg_client_token', res.token)
      localStorage.setItem('abg_client', JSON.stringify(res.client))

      router.push('/client/dashboard')
    } else {
      setError(res.message || 'Erreur de connexion')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#071739] flex items-center justify-center px-6 py-20">
      <div className="bg-white rounded-[35px] shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-[#071739] text-center">
          Espace Client
        </h1>

        <p className="text-gray-500 text-center mt-3">
          Connectez-vous à votre espace sécurisé.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mt-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          <input
            name="email"
            type="email"
            placeholder="Adresse email"
            className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#D4A63D]"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#D4A63D]"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-[#D4A63D] py-4 rounded-2xl font-bold text-[#071739] hover:scale-[1.02] transition"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Pas encore de compte ?{' '}
          <Link href="/client/register" className="text-[#D4A63D] font-bold">
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  )
}