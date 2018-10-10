const jsonToken = localStorage.getItem("token");
const jsonUser = localStorage.getItem("user");
/**
 * 存的时候是json，取的时候就得是json
 * 存的时候是String，取的时候就得是String
 * @type {any}
 */
const storageToken = JSON.parse(jsonToken);
const storageUser = JSON.parse(jsonUser);

const state = {
    // token可以存和Storage(localStorage\sessionStorage\cookie)
    token: storageToken,
    user: storageUser,
}
const getters = {
    // isLogin: state => state.token,
    getToken: state => state.token,
    getUser: state => state.user,
}
const actions = {
    setToken: (context, token) => {
        context.commit("mSetToken", token);
    },
    setUser: (context, user) => {
        context.commit("mSetUser", user);
    },
    removeToken(context) {
        context.commit("mRemoveToken")
    },
    removeUser(context) {
        context.commit("mRemoveUser")
    }
}
const mutations = {
    mSetToken: (state, newToken) => {
        console.log(`newToken: ${newToken}`);
        state.token = newToken;
        localStorage.setItem("token", JSON.stringify(state.token));
    },
    mSetUser: (state, newUser) => {
        console.log(`newUser: ${newUser}`);
        state.user = newUser;
        localStorage.setItem("user", JSON.stringify(state.user));
        // localStorage.setItem("user", state.user);
    },
    mRemoveToken: (state) => {
        state.token = null
        localStorage.removeItem("token")
    },
    mRemoveUser: (state) => {
        state.user = null
        localStorage.removeItem("user")
    }
}
export default {
    state,
    getters,
    actions,
    mutations,
}