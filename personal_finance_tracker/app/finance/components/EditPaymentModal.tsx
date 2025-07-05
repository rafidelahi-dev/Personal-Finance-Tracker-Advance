'use client'

import { useState, useEffect } from "react"

type Payment = {
    id: string;
    amount: number;
    description: string;
    date: string;
    category: 'MONTHLY' | 'EXTERNAL';
};

export default function EditPaymentModal({
    payment, 
    onClose,
}: {
    payment: Payment;
    onClose: () => void;
}){
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        date: '',
        category: 'MONTHLY',
        })

    useEffect(() => {
        setFormData({
            amount: payment.amount.toString(),
            description: payment.description,
            date: new Date(payment.date).toISOString().slice(0, 10),
            category: payment.category,
        });
    }, [payment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`/api/payment/${payment.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        });

        if(res.ok){
            window.location.reload();
        } else{
            alert("Update failed");
        }
    };

    return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-gray-500 text-lg">&times;</button>
        <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="MONTHLY">Monthly</option>
            <option value="EXTERNAL">External</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}