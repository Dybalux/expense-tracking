import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { TrendingDown, Users, DollarSign, LogOut } from 'lucide-react'
import ExpenseList from './ExpenseList'
import LoanList from './LoanList'
import Summary from './Summary'

export default function Dashboard({ session }) {
    const [activeTab, setActiveTab] = useState('expenses')
    const [expenses, setExpenses] = useState([])
    const [loans, setLoans] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        await Promise.all([loadCategories(), loadExpenses(), loadLoans()])
    }

    const loadCategories = async () => {
        const { data } = await supabase.from('categories').select('*').order('name')
        if (data) setCategories(data)
    }

    const loadExpenses = async () => {
        const { data } = await supabase
            .from('expenses')
            .select('*, categories(name, color)')
            .eq('user_id', session.user.id)
            .order('date', { ascending: false })
        if (data) setExpenses(data)
    }

    const loadLoans = async () => {
        const { data } = await supabase
            .from('loans')
            .select('*')
            .eq('user_id', session.user.id)
            .order('date', { ascending: false })
        if (data) setLoans(data)
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }

    const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0)
    const totalLoans = loans
        .filter((l) => !l.returned)
        .reduce((sum, loan) => sum + parseFloat(loan.amount || 0), 0)

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">💰 Mis Finanzas</h1>
                        <p className="text-purple-200">Hola, {session.user.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Salir
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-red-100 text-sm mb-1">Total Gastos</p>
                            <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
                        </div>
                        <TrendingDown className="w-12 h-12 opacity-50" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-orange-100 text-sm mb-1">Prestado</p>
                            <p className="text-3xl font-bold">${totalLoans.toFixed(2)}</p>
                        </div>
                        <Users className="w-12 h-12 opacity-50" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm mb-1">Balance</p>
                            <p className="text-3xl font-bold">-${(totalExpenses + totalLoans).toFixed(2)}</p>
                        </div>
                        <DollarSign className="w-12 h-12 opacity-50" />
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setActiveTab('expenses')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${activeTab === 'expenses'
                            ? 'bg-white text-purple-900'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                >
                    Gastos
                </button>
                <button
                    onClick={() => setActiveTab('loans')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${activeTab === 'loans'
                            ? 'bg-white text-purple-900'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                >
                    Préstamos
                </button>
                <button
                    onClick={() => setActiveTab('summary')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${activeTab === 'summary'
                            ? 'bg-white text-purple-900'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                >
                    Resumen
                </button>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                {activeTab === 'expenses' && (
                    <ExpenseList
                        expenses={expenses}
                        categories={categories}
                        userId={session.user.id}
                        onUpdate={loadExpenses}
                    />
                )}
                {activeTab === 'loans' && (
                    <LoanList loans={loans} userId={session.user.id} onUpdate={loadLoans} />
                )}
                {activeTab === 'summary' && (
                    <Summary expenses={expenses} categories={categories} />
                )}
            </div>
        </div>
    )
}