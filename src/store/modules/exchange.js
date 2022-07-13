import { collectionGroup, getDocs, query } from "firebase/firestore";
import { db } from "../../db";


export default {
  namespaced: true,
  state() {
    return {
      items: []
    }
  },
  actions: {
    // context -> state, commit
    async getExchanges({ commit }) {
      const exchangeQuery = query(collectionGroup(db, "exchanges"))
      const snapshot = await getDocs(exchangeQuery)
      const exchanges = snapshot.docs.map(doc => {
        const data = doc.data()
        return data
      }) 
      commit('setExchanges', exchanges)
    }
  },
  mutations: {
    setExchanges(state, exchanges) {
      state.items = exchanges;
    }
  }
}
