import React, { useState } from "react"
import { Link } from "react-router-dom"
// import Web3 from "web3"

const CHAIN_ID = '0x61'

const Header = () => {
    const [wallet, setWallet] = useState('Connect Wallet')

    const handleWallet = async () => {
      if(typeof window.ethereum === 'undefined') {
        alert("Please install Metamask")
        return
      }
      await window.ethereum.request({ method: "eth_requestAccounts" })
        .then(async (accounts) => {

          let chainId = window.ethereum.chainId
          setWallet(accounts[0])
          localStorage.setItem('wallet', accounts[0])
          
          if(chainId !== CHAIN_ID) {
            // await window.ethereum.request({
            //   method: 'wallet_switchEthereumChain',
            //   params: [{ chainId: Web3.utils.toHex(CHAIN_ID) }],
            // }).then((res) => {  }).catch(err => console.log(err))
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

    return (
        <div id="header">
        <Link to='/' id='logo'>NFT Room</Link>

        <div id="link-containers">
          <a>Explore</a>
          {wallet !== 'Connect Wallet' && <a>My NFTs</a>}
          <a>Create</a>
          <button id="connect-wallet" onClick={handleWallet} >{wallet === 'Connect Wallet' ? wallet : wallet}</button>
        </div>
      </div>
    )
}

export default Header