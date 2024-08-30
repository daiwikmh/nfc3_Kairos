import Web3 from "web3";

const provideer = new Web3.providers.HttpProvider(
    "https://polygon-amoy.g.alchemy.com/v2/kV-ATSZmqzmrxHIti2t3j5bCtjWepdtr"
)
const web3 = new Web(provider)

const abi = [{"inputs":[{"internalType":"address","name":"_client","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_dateOfBirth","type":"string"},{"internalType":"string","name":"_gender","type":"string"},{"internalType":"uint256","name":"_premium","type":"uint256"},{"internalType":"uint256","name":"_coverageAmount","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"client","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimAmount","type":"uint256"},{"indexed":false,"internalType":"string","name":"claimReason","type":"string"},{"indexed":false,"internalType":"uint256","name":"claimDate","type":"uint256"}],"name":"PolicyClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"insuranceProvider","type":"address"},{"indexed":true,"internalType":"address","name":"client","type":"address"},{"indexed":false,"internalType":"uint256","name":"coverageAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"premium","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startDate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endDate","type":"uint256"}],"name":"PolicyCreated","type":"event"},{"inputs":[],"name":"checkPolicyStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"claimAmount","type":"uint256"},{"internalType":"string","name":"claimReason","type":"string"}],"name":"claimPolicy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"client","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"clientDetails","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"dateOfBirth","type":"string"},{"internalType":"string","name":"gender","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"coverageAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"duration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"endDate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPolicyDetails","outputs":[{"internalType":"address","name":"_insuranceProvider","type":"address"},{"internalType":"address","name":"_client","type":"address"},{"internalType":"uint256","name":"_premium","type":"uint256"},{"internalType":"uint256","name":"_coverageAmount","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"uint256","name":"_startDate","type":"uint256"},{"internalType":"uint256","name":"_endDate","type":"uint256"},{"internalType":"bool","name":"_isActive","type":"bool"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_dateOfBirth","type":"string"},{"internalType":"string","name":"_gender","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"insuranceProvider","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"premium","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startDate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const policyContract = new web3.eth.Contract(abi, "0x1029BBd9B780f449EBD6C74A615Fe0c04B61679c")

export default policyContract