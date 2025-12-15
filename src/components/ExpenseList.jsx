import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Plus, Trash2 } from 'lucide-react'
import ExpenseForm from './ExpenseForm'

export default function ExpenseList({ expenses, categories, userId, onUpdate }) {
    const [showForm, setShowForm] = useState(false)

    const handleSubmit = async (formData) => {
        await supabase.from('expenses').insert([
            {
                ...formData,
                amount: parseFloat(formData.amount),
                user_id: userId,
            },
        ])
        setShowForm(false)
        onUpdate()
    }

    const handleDelete = async (id) => {
        await supabase.from('expenses').delete().eq('id', id).eq('user_id', userId)
        onUpdate()
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Gastos</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    {showForm ? 'Cerrar' : 'Nuevo Gasto'}
                </button>
            </div>

            {showForm && (
                <ExpenseForm
                    categories={categories}
                    onSubmit={handleSubmit}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <div className="space-y-3">
                {expenses.length === 0 ? (
                    <p className="text-center text-purple-200 py-8">No hay gastos registrados</p>
                ) : (
                    expenses.map((expense) => (
                        <div
                            key={expense.id}
                            className="bg-white/5 rounded-lg p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                                    style={{ backgroundColor: expense.categories?.color || '#95A5A6' }}
                                >
                                    {expense.categories?.name?.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-semibold">{expense.description}</p>
                                    <p className="text-purple-200 text-sm">
                                        {expense.categories?.name} • {expense.date}
                                    </p>
                                </div>
                                <p className="text-red-400 font-bold text-xl">
                                    -${parseFloat(expense.amount).toFixed(2)}
                                </p>
                                <button
                                    onClick={() => handleDelete(expense.id)}
                                    className="text-red-400 hover:text-red-300 p-2"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}