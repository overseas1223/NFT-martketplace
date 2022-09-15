import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import Web3 from "web3"
import { MARKETPLACE_ABI, MARKETPLACE_ADDRESS, NFT_ABI, NFT_ADDRESS } from "../constants/Constants"
import { mainAction } from "../redux/actions/mainActions"
import { SET_MARKET_CONTRACT, SET_NFT_CONTRACT, SET_WALLET, SET_WEB3} from "../redux/type"
import Logo from "../assets/logo.png"
import "../styles/header.css"

const CHAIN_ID = '0x61' // TEST BNC CHAIN-ID
const BSC_PROVIDER = 'https://data-seed-prebsc-1-s1.binance.org:8545'

const Header = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.main)
  const { wallet, web3Instance } = state
  const navigate = useNavigate()

  const handleExplore = () => { navigate('/explore') }

  const handleCreate = () => {
    if(typeof window.ethereum === 'undefined') {
      alert("Please install Metamask")
      return
    }
    if(wallet === null) {
      alert("Please connect Wallet")
      return
    }
    navigate('/create')
  }

  const handleWallet = async () => {
    if(typeof window.ethereum === 'undefined') {
      dispatch({ type: SET_WEB3, payload: new Web3(BSC_PROVIDER) })
      alert("Pls install metamask")
      return
    }
    await window.ethereum.request({ method: "eth_requestAccounts" })
      .then(async (accounts) => {

        let chainId = window.ethereum.chainId
        dispatch({ type: SET_WALLET, payload: accounts[0]})
        dispatch({ type: SET_WEB3, payload: new Web3(window.ethereum)})
        localStorage.setItem('wallet', accounts[0])
        
        if(chainId !== CHAIN_ID) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: Web3.utils.toHex(CHAIN_ID) }],
          }).then((res) => {  }).catch(err => console.log(err))
        } 
      }).catch(async (err) => {
        if (err.code === 4902) {}
      })
  }

  useEffect(() => {
    if(web3Instance) {
      if(wallet) dispatch(mainAction.getBalanceOfBNB(web3Instance, wallet))
      dispatch({ type: SET_NFT_CONTRACT, payload: new web3Instance.eth.Contract(NFT_ABI, NFT_ADDRESS) })
      dispatch({ type: SET_MARKET_CONTRACT, payload: new web3Instance.eth.Contract(MARKETPLACE_ABI, MARKETPLACE_ADDRESS) })
    }
  }, [web3Instance, wallet])

  useEffect(() => {
    const address = localStorage.getItem('wallet')
    if(address) {
      dispatch({ type: SET_WALLET, payload: address })
      if(window.ethereum) dispatch({ type: SET_WEB3, payload: new Web3(window.ethereum)})
    } else dispatch({ type: SET_WEB3, payload: new Web3(BSC_PROVIDER) })

    if(window.ethereum) {
      window.ethereum.on('accountsChanged', async () => {
        const accounts = await window.ethereum.request({method: 'eth_accounts'});
        if (!(accounts && accounts.length > 0)) {
          localStorage.clear()
          dispatch({ type: SET_WALLET, payload: null})
        }
      })
    }
  }, [])

  return (
      <div id="header">
      <Link to='/' id='logo'><img src={Logo} alt="log" /></Link>
      <div id="link-containers">
        <a onClick={handleExplore}>Explore</a>
        {wallet && <a>My NFTs</a>}
        <a onClick={handleCreate}>Create</a>
        <button id="connect-wallet" onClick={handleWallet} >{wallet ? `${wallet.substring(0, 9).toUpperCase()}...${wallet.substring(wallet.length - 4).toUpperCase()}` : 'Connect Wallet'}</button>
      </div>
    </div>
  )
}

export default Header