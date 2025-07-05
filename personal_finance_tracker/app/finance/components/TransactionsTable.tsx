'use client';
import { useState } from "react";
import EditPaymentModal from "./EditPaymentModal";


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
  const [editingPayment, setEditingPayment] = useState<null | Payment>(null);


  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this transaction?")
    if(!confirmed) return;

    const res = await fetch(`/api/payment/${id}`, {
      method: 'DELETE',
    })

    if(res.ok){
      window.location.reload();
    }else{
      alert("Failed to delete transaction")
    }
  };

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
            <th className="p-2 border-b text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-2 text-center text-gray-500">No payments yet</td>
            </tr>
          ) : (
            payments.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{new Date(p.date).toLocaleDateString()}</td>
                <td className="p-2 border-b">{p.description}</td>
                <td className="p-2 border-b">{p.category}</td>
                <td className="p-2 border-b text-red-600">- RM{p.amount.toFixed(2)}</td>
                <td className="p-2 border-b text-right space-x-2">
                  <button
                    onClick={() => setEditingPayment(p)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    🗑️ Delete
                  </button>
                </td>
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
      {editingPayment && (
        <EditPaymentModal
          payment={editingPayment}
          onClose={() => setEditingPayment(null)}
        />
      )}
    </div>
    
  );
}
