'use client';

import { useState } from "react";

export default function PaymentForm({ accountId }: { accountId: string }) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: '',
    category: 'MONTHLY',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, accountId }),
    });

    if (res.ok) {
      setMessage('Payment added!');
      setFormData({ amount: '', description: '', date: '', category: 'MONTHLY' });
      window.location.reload();
    } else {
      setMessage('Failed to add payment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold">Add New Payment</h2>

      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
        className="w-full border rounded p-2"
      />

      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
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

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Payment
      </button>

      {message && <p className="text-sm text-green-600">{message}</p>}
    </form>
  );
}
