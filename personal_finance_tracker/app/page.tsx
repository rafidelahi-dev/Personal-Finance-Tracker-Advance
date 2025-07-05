"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [formData, setFormData] = useState({fullName: '', email: '', password: ''})
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try{
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      });

      const contentType = res.headers.get('content-type');

      if(!res.ok){
        if(!contentType || !contentType.includes('application/json')){
          const errorText = await res.text();
          console.error('Non-JSON error response:', errorText);
          throw new Error('Unexpected server error');
        }
        const result = await res.json();
        setMessage(result.error || 'Login failed');
        setMessageType('error');
        return;
      }
      setMessage('Login Successful');
      setMessageType('success');
      setFormData({fullName: '', email: '', password: ''})

      setTimeout(() => {
        router.push('/finance');
      }, 1000)

    }catch(error){
      console.error('Login Failed: ', error);
      setMessage('Please insert correct password')
      setMessageType('error');
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage('');

  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const contentType = res.headers.get('content-type');

    if (!res.ok) {
      // If response is not JSON, try to read as text for debugging
      if (!contentType || !contentType.includes('application/json')) {
        const errorText = await res.text();
        console.error('Server returned HTML or non-JSON:', errorText);
        throw new Error('Server error (non-JSON response)');
      }

      const result = await res.json();
      setMessage(result.error || 'Signup failed');
      setMessageType('error');
      return;
    }

    // Handle success
    const result = await res.json();
    setMessage('Signup successful!');
    setMessageType('success');
    setFormData({ fullName: '', email: '', password: '' });
    setTimeout(() => setIsSignUpOpen(false), 1000);

  } catch (err) {
    console.error('Signup failed:', err);
    setMessage('Signup failed');
    setMessageType('error');
  }
};


  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">MySite</h1>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Welcome</h2>
          <div className="flex flex-col space-y-4">
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={() => setIsLogInOpen(true)}>
              Log In
            </button>
            <button className="border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50" onClick={()=> setIsSignUpOpen(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} MySite. All rights reserved.</p>
      </footer>

      {isLogInOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setIsLogInOpen(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">Log In</h3>
            <form
              onSubmit={handleLogIn}
              className="space-y-4"
            >
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded p-2"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Log In
              </button>
            </form>

            {message && (
              <p
                className={`text-sm mt-4 text-center ${
                  messageType === 'error' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      )}

      {/*SignUp Pop up*/}
      {isSignUpOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
            {/*Close button*/}
            <button className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
            onClick={()=> setIsSignUpOpen(false)}>
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">Create an Account</h3>

            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label className="block mb-1 text-sm font-medium">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} className="w-full border rounded p-2" placeholder="John Doe" onChange={handleInputChange}required/>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required className="w-full border rounded p-2" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Password</label>
                <input type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required className="w-full border rounded p-2" placeholder="********" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Sign Up
              </button>
            </form>
            {message && (
              <p
                className={`text-sm mt-4 text-center ${
                  messageType === 'error' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>  
      )}
    </div>
  );
}