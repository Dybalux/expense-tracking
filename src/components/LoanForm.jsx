import { useState } from 'react'

export default function LoanForm({ onSubmit, onCancel }) {
    const [form, setForm] = useState({
        person_name: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.person_name || !form.amount) return
        onSubmit(form)
        setForm({
            person_name: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            notes: '',
        })
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white/5 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Nombre de la persona"
                    value={form.person_name}
                    onChange={(e) => setForm({ ...form, person_name: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Monto"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                />
                <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                />
                <input
                    type="text"
                    placeholder="Notas (opcional)"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
            <div className="flex gap-4">
                <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                    Agregar Préstamo
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </form>
    )
}