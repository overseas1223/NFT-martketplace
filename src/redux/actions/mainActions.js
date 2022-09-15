import { SET_BALANCE, SET_LOADING, SET_MARKET_ITEMS } from "../type"
import axios from "axios"

let decimal = 10 ** 18

export const mainAction = {
    getBalanceOfBNB: (web3, wallet) => async (dispatch) => {
        const balance = await web3.eth.getBalance(wallet)
        dispatch({ type: SET_BALANCE, payload: Number(balance) / decimal })
    },

    getMarketItems: (marketContract) => async (dispatch) => {
        try {
            dispatch({ type: SET_LOADING, payload: true})
            const items = await marketContract.methods.fetchMarketItems().call()
            let metaFuncs = []
            items.forEach((item) => { metaFuncs.push(axios.get(item.metadataURL)) })
            const results = await Promise.all(metaFuncs)

            let marketItems = []
            results.forEach((result, index) => {
                marketItems.push({
                    id: items[index].itemId,
                    name: result.data.name,
                    description: result.data.description,
                    src: items[index].imgURL,
                    price: Number(items[index].price) / decimal,
                })
            })
            dispatch({ type: SET_MARKET_ITEMS, payload: marketItems })
            dispatch({ type: SET_LOADING, payload: false})
        } catch (err) {
            console.log(err)
            dispatch({ type: SET_LOADING, payload: false})
        }
    }
}