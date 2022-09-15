import { useState } from "react"
import { Link } from "react-router-dom"

const Header = () => {
    const [wallet, SetWallet] = useState('Connect Wallet')
    const handleWallet = () => {
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