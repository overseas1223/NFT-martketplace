import * as actionTypes from '../type'

const INITIAL_STATE = {
  wallet: 'Connect Wallet',
  loading: false
}

const mainReducer = (state = INITIAL_STATE, action) => {
  const { payload = null } = action
  switch (action.type) {
    case actionTypes.SET_WALLET:
      return {
        ...state,
        wallet: payload
      }
      default:
        return state
  }
}

export default mainReducer