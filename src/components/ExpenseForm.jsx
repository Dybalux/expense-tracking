import { useState } from 'react'

export default function ExpenseForm({ categories, onSubmit, onCancel }) {
    const [form, setForm] = useState({
        description: '',
        amount: '',
        category_id: '',
        date: new Date().toISOString().split('T')[0],
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.description || !form.amount || !form.category_id) return
        onSubmit(form)
        setForm({
            description: '',
            amount: '',
            category_id: '',
            date: new Date().toISOString().split('T')[0],
        })
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white/5 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Descripción"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Monto"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
                <select
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                    className="bg-purple-500 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
            </div>
            <div className="flex gap-4">
                <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                    Agregar Gasto
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