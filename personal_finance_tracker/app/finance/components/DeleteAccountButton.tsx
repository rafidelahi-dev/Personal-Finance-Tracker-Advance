'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DeleteAccountButton(){
    const router = useRouter();
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        const res = await fetch('/api/delete-account', {method: 'DELETE'});

        if(res.ok){
            router.push('/')
        }else {
            alert('Failed to delete account')
        }
        setLoading(false);
    }

    return(
        <div className="mt-6">
            {!confirm ? (
                <button 
                onClick={() => setConfirm(true)}
                className="text-red-600 underline"
                >
                    Delete my Account
                </button>
            ) : (
              <div className="flex gap-4 items-center">
                <p className="text-sm text-red-700">Are you sure?</p>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                    {loading ? 'Deleting...' : 'Yes, delete'}
                </button>
                <button
                    onClick={() => setConfirm(false)}
                    className="text-sm underline text-gray-600"
                >
                    Cancel
                </button>
                </div>  
            )}
        </div>
    )
}