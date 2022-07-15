import {
  collectionGroup,
  getDocs,
  query,
  doc,
  addDoc,
  collection,
  where,
  getDoc
} from "firebase/firestore";
import { db } from "../../db";
import slugify from "slugify";
export default {
  namespaced: true,
  state() {
    return {
      items: [],
      item: {}
    };
  },

  actions: {
    // context -> state, commit
    async getExchanges({ commit }) {
      const exchangeQuery = query(collectionGroup(db, "exchanges"));
      const snapshot = await getDocs(exchangeQuery);
      const exchanges = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      commit("setExchanges", exchanges);
    },

    async createExchange({ rootState, dispatch }, { data, onSuccess }) {
      const userRef = doc(db, "user", rootState.user.data.id);
      data.user = userRef;
      data.slug = slugify(`${data.title}-${Date.now()}`, {
        lower: true,
        strict: true,
      });
      await addDoc(collection(db, "exchanges"), data);
      dispatch("toast/success", "Exchange was created sucesfuly", {
        root: true,
      });
      onSuccess();
    },
    // get exchange by slug
    async getExchangeBySlug({commit, state}, slug){
      state.item = {}
      const docQuery = query(
        collection(db, "exchanges"),
        where("slug", "==", slug)
      )
      const querySnap = await getDocs(docQuery)
      const exchange = querySnap.docs[0].data()

      const userSnap = await getDoc(exchange.user)
      exchange.user = userSnap.data()
      exchange.user.id = userSnap.id
      commit('setExchange', exchange)
    }
  },

  mutations: {
    setExchanges(state, exchanges) {
      state.items = exchanges;
    },
    setExchange(state, exchange) {
      state.item = exchange;
    },

  },
};
