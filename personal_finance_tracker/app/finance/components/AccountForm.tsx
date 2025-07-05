'use client';

export default function AccountForm({ userId }: { userId: string }) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const budget = formData.get('budget');
    
    const res = await fetch('/api/account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, budget }),
    });

    if (res.ok) window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-xl w-full max-w-md">
      <label className="block mb-2 text-sm font-medium">Starting Budget</label>
      <input name="budget" type="number" required className="w-full border rounded p-2" />
      <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Create Account
      </button>
    </form>
  );
}
