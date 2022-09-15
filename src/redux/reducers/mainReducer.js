import * as actionTypes from '../type'

const INITIAL_STATE = {
  wallet: null,
  loading: false,
  web3Instance: null,
  balance: 0,
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
    default:
      return state
  }
}

export default mainReducer