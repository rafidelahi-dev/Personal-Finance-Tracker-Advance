'use client';

import { useState } from "react";
import LogoutButton from "./LogoutButton";
import AccountForm from "./components/AccountForm";
import PaymentForm from "./components/PaymentForm";
import TransactionsTable from "./components/TransactionsTable";
import DeleteAccountButton from "./components/DeleteAccountButton";

type FinanceClientProps = {
  user: User;
  account: Account | null;
  payments: Payment[];
};

export default function FinanceClient({ user, account, payments }: FinanceClientProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-10 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome to the Finance Page</h1>
          <p>User Name: {user.fullName}</p>
        </div>
        <LogoutButton />
      </div>

      {!account ? (
        <>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-4 py-2 rounded text-white transition-colors duration-200
    ${showForm ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            Start Tracking My Wallet
          </button>
          {showForm && <AccountForm userId={user.userId} />}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PaymentForm accountId={account.id} />
          <TransactionsTable payments={payments} budget={account.budget} />
          <DeleteAccountButton/>
        </div>
      )}
    </div>
  );
}
