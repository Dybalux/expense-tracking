import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Mail, Lock } from 'lucide-react'

export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mode, setMode] = useState('login')
    const [message, setMessage] = useState('')

    const handleAuth = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            if (mode === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (error) throw error
                setMessage('¡Registro exitoso! Revisa tu email para confirmar tu cuenta.')
            }
        } catch (error) {
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">💰 Mis Finanzas</h1>
                    <p className="text-purple-200">Gestiona tus gastos y préstamos</p>
                </div>

                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setMode('login')}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${mode === 'login'
                                ? 'bg-white text-purple-900'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        onClick={() => setMode('signup')}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${mode === 'signup'
                                ? 'bg-white text-purple-900'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                    >
                        Registrarse
                    </button>
                </div>

                {message && (
                    <div
                        className={`mb-4 p-3 rounded-lg ${message.includes('exitoso')
                                ? 'bg-green-500/20 text-green-200'
                                : 'bg-red-500/20 text-red-200'
                            }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                        {loading ? 'Cargando...' : mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
                    </button>
                </form>

                <p className="text-center text-purple-200 text-sm mt-6">
                    {mode === 'login'
                        ? '¿No tienes cuenta? Haz clic en Registrarse'
                        : '¿Ya tienes cuenta? Haz clic en Iniciar Sesión'}
                </p>
            </div>
        </div>
    )
}