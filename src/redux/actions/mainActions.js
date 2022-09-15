import { SET_BALANCE } from "../type"

let decimal = 10 ** 18

export const mainAction = {
    getBalanceOfBNB: (web3, wallet) => async (dispatch) => {
        const balance = await web3.eth.getBalance(wallet)
        dispatch({ type: SET_BALANCE, payload: Number(balance) / decimal })
    },
}