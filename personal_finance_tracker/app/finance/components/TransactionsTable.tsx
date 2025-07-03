'use client';

type Payment = {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: 'MONTHLY' | 'EXTERNAL';
};

export default function TransactionsTable({
  payments,
  budget,
}: {
  payments: Payment[];
  budget: number;
}) {
  const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = budget - totalSpent;

  return (
    <div className="bg-white shadow-md p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border-b">Date</th>
            <th className="p-2 border-b">Description</th>
            <th className="p-2 border-b">Category</th>
            <th className="p-2 border-b">Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-2 text-center text-gray-500">No payments yet</td>
            </tr>
          ) : (
            payments.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{new Date(p.date).toLocaleDateString()}</td>
                <td className="p-2 border-b">{p.description}</td>
                <td className="p-2 border-b">{p.category}</td>
                <td className="p-2 border-b text-red-600">- RM{p.amount.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-4 text-right space-y-1">
        <p><strong>Initial Budget:</strong> RM{budget.toFixed(2)}</p>
        <p><strong>Total Spent:</strong> RM{totalSpent.toFixed(2)}</p>
        <p><strong>Remaining:</strong> RM{remaining.toFixed(2)}</p>
      </div>
    </div>
  );
}
