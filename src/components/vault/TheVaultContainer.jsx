"use client"

import { ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react';
import React, { useState } from 'react';
import { CalenderLogo, CoinsLogo, Logo, MainLogo } from '../share/svg/Logo';

const TheVaultContainer = ({ isOpen, onClose }) => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);

    const handlePasswordSubmit = () => {
        // For demo purposes, any password will unlock the vault
        if (password.trim() !== "") {
          setIsVaultUnlocked(true);
          setPassword("");
          setPasswordError("");
        } else {
          setPasswordError("Please enter a password.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-black h-[550px] rounded-2xl p-8 max-w-md w-full relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 text-white/70 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                {/* Modal content */}
                {!isVaultUnlocked ? (
                    <div className="text-center mx-auto">
                        <div className="mb-6">
                            {/* <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center">
                                <Lock className="w-10 h-10 text-white" />
                            </div> */}
                            <h2 className="text-3xl font-bold text-white mb-2">The Vault</h2>
                        </div>

                        <div className="mb-6">
                            <p className="text-white/80 mb-4">Minimum Requirements To Ask For Permission:</p>
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                        <MainLogo className="bg-premium" color="#DB9D17" />
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <CalenderLogo />
                                    </div>
                                    <span className="text-[40px] font-bold font-brush">5</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                        <Logo />
                                    </div>
                                    <span className="text-[40px] font-bold font-brush">1000</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <CoinsLogo />
                                    </div>
                                    <span className="text-yellow-500 text-[40px] font-brush font-bold">1000</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-white/70 text-start text-sm mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError(""); // Clear error when typing
                                    }}
                                    className="w-full  border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 pr-12"
                                    placeholder="Enter password"
                                    autoComplete="off"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handlePasswordSubmit();
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {passwordError && (
                                <p className="text-red-400 text-sm mt-2">{passwordError}</p>
                            )}
                        </div>

                        <button
                            onClick={handlePasswordSubmit}
                            className="w-full border border-white/40 p-2 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Unlock The Vault
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="mb-6">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
                                <Lock className="w-10 h-10 text-black" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Vault Unlocked</h2>
                            <p className="text-white/80">Welcome to the exclusive content</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {[1, 2, 3, 4].map((item) => (
                                <div 
                                    key={item} 
                                    className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 flex items-center justify-center border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                                >
                                    <div className="text-center">
                                        <div className="text-yellow-500 font-bold mb-2">Premium {item}</div>
                                        <div className="text-white/70 text-sm">Exclusive content</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsVaultUnlocked(false)}
                            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Lock The Vault
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TheVaultContainer;