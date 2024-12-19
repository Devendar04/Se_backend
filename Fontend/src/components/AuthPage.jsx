import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <div className={`flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-blue-200`}>
            <div className={`relative bg-white rounded-xl shadow-xl overflow-hidden w-[768px] max-w-full min-h-[480px]`}>
                <div
                    className={`absolute top-0 left-1/2 w-1/2 h-full transition-transform duration-500 z-20 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white flex flex-col items-center justify-center text-center px-8 ${isRegistering ? 'transform -translate-x-full' : ''}`}
                >
                    {isRegistering ? (
                        <>
                            <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
                            <p className="text-sm mb-4">Enter your personal details to use all site features</p>
                            <button
                                className="bg-transparent border border-white rounded-lg px-6 py-2 text-sm uppercase font-semibold tracking-wide hover:bg-white hover:text-indigo-700"
                                onClick={() => setIsRegistering(false)}
                            >
                                Sign In
                            </button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold mb-2">Hello, Friend!</h1>
                            <p className="text-sm mb-4">Register with your personal details to use all site features</p>
                            <button
                                className="bg-transparent border border-white rounded-lg px-6 py-2 text-sm uppercase font-semibold tracking-wide hover:bg-white hover:text-indigo-700"
                                onClick={() => setIsRegistering(true)}
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
                <div className={`relative flex w-full h-full transition-transform duration-500 ${isRegistering ? 'transform translate-x-1/2' : ''}`}>
                    <div className={`w-1/2 flex flex-col justify-center items-center bg-white p-8`}>
                        {isRegistering ? <RegisterForm /> : <LoginForm />}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
