import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Plus, Trash2, Check, Users } from 'lucide-react'
import LoanForm from './LoanForm'

export default function LoanList({ loans, userId, onUpdate }) {
    const [showForm, setShowForm] = useState(false)

    const handleSubmit = async (formData) => {
        await supabase.from('loans').insert([
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
        await supabase.from('loans').delete().eq('id', id).eq('user_id', userId)
        onUpdate()
    }

    const toggleReturned = async (loan) => {
        await supabase
            .from('loans')
            .update({ returned: !loan.returned })
            .eq('id', loan.id)
            .eq('user_id', userId)
        onUpdate()
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Préstamos</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    {showForm ? 'Cerrar' : 'Nuevo Préstamo'}
                </button>
            </div>

            {showForm && (
                <LoanForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
            )}

            <div className="space-y-3">
                {loans.length === 0 ? (
                    <p className="text-center text-purple-200 py-8">No hay préstamos registrados</p>
                ) : (
                    loans.map((loan) => (
                        <div
                            key={loan.id}
                            className={`rounded-lg p-4 flex items-center justify-between transition-colors ${loan.returned ? 'bg-green-500/20' : 'bg-white/5 hover:bg-white/10'
                                }`}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div
                                    className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold ${loan.returned ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                                        }`}
                                >
                                    <Users className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-semibold">{loan.person_name}</p>
                                    <p className="text-purple-200 text-sm">
                                        {loan.date} {loan.notes && `• ${loan.notes}`}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p
                                        className={`font-bold text-xl ${loan.returned ? 'text-green-400' : 'text-orange-400'
                                            }`}
                                    >
                                        ${parseFloat(loan.amount).toFixed(2)}
                                    </p>
                                    <p className="text-xs text-purple-200">{loan.returned ? 'Devuelto' : 'Pendiente'}</p>
                                </div>
                                <button
                                    onClick={() => toggleReturned(loan)}
                                    className={`p-2 rounded-lg ${loan.returned ? 'text-green-400 hover:text-green-300' : 'text-white/50 hover:text-white'
                                        }`}
                                >
                                    <Check className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(loan.id)}
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
