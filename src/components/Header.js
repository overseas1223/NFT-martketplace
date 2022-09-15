import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import Web3 from "web3"

const CHAIN_ID = '0x61' // TEST BNC CHAIN-ID

const Header = () => {
  const [wallet, setWallet] = useState('Connect Wallet')
  const navigate = useNavigate()

  const handleCreate = () => {
    if(typeof window.ethereum === 'undefined') {
      alert("Please install Metamask")
      return
    }
    if(wallet === 'Connect Wallet') {
      alert("Please connect Wallet")
      return
    }
    navigate('/create')
  }

  const handleWallet = async () => {
    if(typeof window.ethereum === 'undefined') {
      alert("Pls install metamask")
      return
    }
    await window.ethereum.request({ method: "eth_requestAccounts" })
      .then(async (accounts) => {

        let chainId = window.ethereum.chainId
        setWallet(accounts[0])
        localStorage.setItem('wallet', accounts[0])
        
        if(chainId !== CHAIN_ID) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: Web3.utils.toHex(CHAIN_ID) }],
          }).then((res) => {  }).catch(err => console.log(err))
        } 
      }).catch(async (err) => {
        if (err.code === 4902) {
          // await window.ethereum.request({
          //   method: 'wallet_addEthereumChain',
          //   params: [chainConfig]
          // })
        }
      })
  }

  useEffect(() => {
    const address = localStorage.getItem('wallet')
    if(address) setWallet(address)

    if(window.ethereum) {
      window.ethereum.on('accountsChanged', async () => {
        const accounts = await window.ethereum.request({method: 'eth_accounts'});
        if (!(accounts && accounts.length > 0)) {
          localStorage.clear()
          setWallet('Connect Wallet')
        }
      })
    }
  }, [])

  return (
      <div id="header">
      <Link to='/' id='logo'>NFT Room</Link>
      <div id="link-containers">
        <a>Explore</a>
        {wallet !== 'Connect Wallet' && <a>My NFTs</a>}
        <a onClick={handleCreate}>Create</a>
        <button id="connect-wallet" onClick={handleWallet} >{wallet === 'Connect Wallet' ? wallet : wallet.substring(0, 9).toUpperCase()}...{wallet.substring(wallet.length - 4).toUpperCase()}</button>
      </div>
    </div>
  )
}

export default Header