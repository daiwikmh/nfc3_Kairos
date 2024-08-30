import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const MetaMaskConnector = () => {
    const [publicKey, setPublicKey] = useState(null);
    const [error, setError] = useState('');

    const connectMetaMask = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                if (accounts.length > 0) {
                    const address = accounts[0];
                    setPublicKey(address);

                    // Optional: Create a new provider and signer
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();

                    // You might use the provider and signer for additional functionality
                } else {
                    setError("No accounts found.");
                }
            } catch (err) {
                setError(`Error connecting to MetaMask: ${err.message}`);
            }
        } else {
            setError("MetaMask is not installed!");
        }
    };

    useEffect(() => {
        // Connect automatically when the component mounts
        connectMetaMask();

        // Handle account changes
        const handleAccountsChanged = (accounts) => {
            if (accounts.length > 0) {
                setPublicKey(accounts[0]);
            } else {
                setPublicKey(null);
                setError("No accounts found.");
            }
        };

        window.ethereum?.on('accountsChanged', handleAccountsChanged);

        // Cleanup event listener on component unmount
        return () => {
            window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, []);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {publicKey ? (
                <p className="connect-wallet-btn">{publicKey}</p>
            ) : (
                <button className="connect-wallet-btn" onClick={connectMetaMask}>Connect MetaMask</button>
            )}
        </div>
    );
};

export default MetaMaskConnector;
