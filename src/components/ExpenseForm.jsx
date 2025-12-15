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

        // Validar que el monto sea positivo
        if (parseFloat(form.amount) <= 0) {
            alert('El monto debe ser mayor a 0')
            return
        }

        onSubmit(form)
        setForm({
            description: '',
            amount: '',
            category_id: '',
            date: new Date().toISOString().split('T')[0],
        })
    }

    const handleAmountChange = (e) => {
        const value = e.target.value
        // Permitir solo números positivos
        if (value === '' || parseFloat(value) >= 0) {
            setForm({ ...form, amount: value })
        }
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
                    min="0.01"
                    placeholder="Monto"
                    value={form.amount}
                    onChange={handleAmountChange}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
                <select
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                    className="bg-purple-200 border border-white/20 rounded-lg px-4 py-2 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                >
                    <option value="" className="bg-purple-100 text-gray-900">Seleccionar categoría</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-purple-100 text-gray-900">
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