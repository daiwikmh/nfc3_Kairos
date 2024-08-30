import React, { useState } from 'react';
import Web3 from 'web3';
import PolicyContractABI from '../../Contract/artifacts/contracts/PolicyContract.sol/PolicyContract.json'; // Update this path according to your project structure
import { generatePDF } from "../src/utils/generatePDF";
import { create as ipfs } from 'ipfs-http-client';


const InsuranceApp = () => {
    const [formData, setFormData] = useState({
        clientAddress: '',
        clientName: '',
        dateOfBirth: '',
        gender: '',
        premium: '',
        coverageAmount: '',
        duration: ''
    });
    const [web3, setWeb3] = useState(null);
    const [publicKey, setPublicKey] = useState(null);
    const [error, setError] = useState('');
    const [ipfsHash, setIpfsHash] = useState(''); // Initialize the ipfsHash state
    const [contractAddress, setContractAddress] = useState('0x1029BBd9B780f449EBD6C74A615Fe0c04B61679c'); // Replace with your deployed contract address

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const connectMetaMask = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                if (accounts.length > 0) {
                    const address = accounts[0];
                    setPublicKey(address);
                    
                    // Initialize web3 and set in state
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!web3) {
            alert("Please connect your wallet first.");
            return;
        }

        try {
            const accounts = await web3.eth.getAccounts();
            const policyContract = new web3.eth.Contract(PolicyContractABI.abi, contractAddress);

            const clientAddress = formData.clientAddress;
            const clientName = formData.clientName;
            const dateOfBirth = formData.dateOfBirth;
            const gender = formData.gender;
            const premium = web3.utils.toWei(formData.premium, 'ether');
            const coverageAmount = web3.utils.toWei(formData.coverageAmount, 'ether');
            const duration = formData.duration;

            // Interact with the contract to create a new policy
            await policyContract.methods
                .addPolicy(clientAddress, clientName, dateOfBirth, gender, premium, coverageAmount, duration)
                .send({ from: accounts[0] });

            console.log("Policy created successfully");

            // Generate the PDF after the policy is created
            generatePDF({
                address: clientAddress,
                name: clientName,
                dateOfBirth,
                gender,
                premium: formData.premium, // Pass in ETH, not wei
                coverageAmount: formData.coverageAmount, // Pass in ETH, not wei
                duration
            });

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='insurance-form'>
            <div className={"walletSection"}>
                {!publicKey ? (
                    <button className={"connectWalletBtn"} onClick={connectMetaMask}>
                        Connect Wallet
                    </button>
                ) : (
                    <p className={"publicKey"}>{publicKey}</p>
                )}
                {error && <p className={"error"}>{error}</p>}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="clientAddress"
                    placeholder="Client Address"
                    value={formData.clientAddress}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="clientName"
                    placeholder="Client Name"
                    value={formData.clientName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="premium"
                    placeholder="Premium (in ETH)"
                    value={formData.premium}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="coverageAmount"
                    placeholder="Coverage Amount (in ETH)"
                    value={formData.coverageAmount}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="duration"
                    placeholder="Duration (in days)"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create Policy</button>
            </form>
            {ipfsHash && (
    <p>
        PDF uploaded to IPFS: <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">View PDF</a>
    </p>
)}
            
        </div>
    );
};

export default InsuranceApp;
