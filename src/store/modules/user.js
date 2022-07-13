import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../db";
export default {
  namespaced: true,
  state() {
    return {
      data: null,
      auth: {
        isProcessing: false,
        error: "",
      },
    };
  },
  getters: {
    isAuthenticated(state) {
      return !!state.data;
    },
  },
  // flow là: khởi chạy chương trình, gọi hàm onAuthChange kiểm tra user có đăng nhâp? có thì lấy dữ liệu rồi set và state data -> isAuthenticated[true] : không có thì k set dữ liệu, và gettter isAuthenticated sẽ là false
  actions: {
    onAuthChange({ dispatch, commit }, callback) {
      commit("setAuthIsProcessing", true);
      // lấy dữ liệu user auth
      onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
          await dispatch("getUserProfile", user);
          commit("setAuthIsProcessing", false);
          callback(user);
        } else {
          console.log("log out");
          commit("setAuthIsProcessing", false);
          callback(null);
        }
      });
    },

    async updateProfile({ commit, dispatch }, { data, onSuccess }) {
      const userRef = doc(db, "user", data.id);
      await updateDoc(userRef, data);
      commit("updateProfile", data);
      dispatch("toast/success", "Profle has been updated", { root: true });
      onSuccess();
    },

    // hàm lấy dữ liệu từ trong db theo user auth
    // merge auth và user
    async getUserProfile({ commit }, user) {
      // tham chiếu
      const docRef = doc(db, "user", user.uid);
      // bản chụp nhanh
      const docSnap = await getDoc(docRef);
      // real data
      const userProfile = docSnap.data();
      const useWithProfile = {
        id: user.uid,
        email: user.email,
        ...userProfile,
      };
      commit("setUser", useWithProfile);
    },

    // lấy dữ liệu từ form và đổ vào db firebase
    async register({ commit, dispatch }, { email, password, username }) {
      commit("setAuthIsProcessing", true);
      commit("setAuthError", "");
      try {
        const { user } = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password
        );
        await dispatch("createUserProlife", {
          id: user.uid,
          username,
          avatar:
            "https://www.pinclipart.com/pindetail/JRxJhi_clip-art-funny-avartars-funny-user-avatar-png/",
          credit: 0,
          exchange: [],
        });
      } catch (e) {
        commit("setAuthError", e.message);
        dispatch("toast/error", e.message, { root: true });
      } finally {
        commit("setAuthIsProcessing", false);
      }
    },

    // login with email and password
    async login({ commit, dispatch }, { email, password }) {
      commit("setAuthIsProcessing", true);
      commit("setAuthError", "");
      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
      } catch (e) {
        commit("setAuthError", e.message);
        dispatch("toast/error", e.message, { root: true });
      } finally {
        commit("setAuthIsProcessing", false);
      }
    },

    async logout({ commit }) {
      try {
        await signOut(getAuth());
        commit("setUser", null);
      } catch (error) {
        console.error("Cannot logout");
      }
    },

    async createUserProlife(_, { id, ...profile }) {
      const docRef = doc(db, "user", id);
      await setDoc(docRef, profile);
    },
  },
  mutations: {
    setAuthIsProcessing(state, isProcessing) {
      state.auth.isProcessing = isProcessing;
    },
    setAuthError(state, error) {
      state.auth.error = error;
    },
    setUser(state, user) {
      // console.log(user);
      state.data = user;
      console.log(state.data);
    },
    updateProfile(state, profile) {
      state.data = { ...state.data, ...profile };
    },
  },
};
