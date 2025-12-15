export default function Summary({ expenses, categories }) {
    const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0)

    const expensesByCategory = categories
        .map((cat) => ({
            ...cat,
            total: expenses
                .filter((exp) => exp.category_id === cat.id)
                .reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0),
        }))
        .filter((cat) => cat.total > 0)
    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Resumen por Categoría</h2>
            <div className="space-y-4">
                {expensesByCategory.length === 0 ? (
                    <p className="text-center text-purple-200 py-8">No hay datos para mostrar</p>
                ) : (
                    expensesByCategory.map((cat) => {
                        const percentage = (cat.total / totalExpenses) * 100
                        return (
                            <div key={cat.id} className="bg-white/5 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.color }} />
                                        <span className="text-white font-semibold">{cat.name}</span>
                                    </div>
                                    <span className="text-white font-bold">${cat.total.toFixed(2)}</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full transition-all"
                                        style={{
                                            width: `${percentage}%`,
                                            backgroundColor: cat.color,
                                        }}
                                    />
                                </div>
                                <p className="text-purple-200 text-sm mt-1">{percentage.toFixed(1)}% del total</p>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}