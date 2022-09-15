import * as actionTypes from '../type'

const INITIAL_STATE = {
  wallet: null,
  loading: false,
  web3Instance: null,
  balance: 0,
  nftContract: null,
  marketContract: null,
  marketItems: []
}

const mainReducer = (state = INITIAL_STATE, action) => {
  const { payload = null } = action
  switch (action.type) {
    case actionTypes.SET_WALLET:
      return {
        ...state,
        wallet: payload
      }
    case actionTypes.SET_WEB3:
      return {
        ...state,
        web3Instance: payload
      }
    case actionTypes.SET_BALANCE:
      return {
        ...state,
        balance: payload
      }
    case actionTypes.SET_NFT_CONTRACT:
      return {
        ...state,
        nftContract: payload
      }
    case actionTypes.SET_MARKET_CONTRACT:
      return {
        ...state,
        marketContract: payload
      }
    case actionTypes.SET_MARKET_ITEMS:
      return {
        ...state,
        marketItems: payload
      }
    default:
      return state
  }
}

export default mainReducer