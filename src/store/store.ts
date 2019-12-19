import Vue from "vue";
import Vuex, { GetterTree, ActionTree, MutationTree, Commit } from "vuex";

Vue.use(Vuex);

interface State {
  username: string;
  count: number;
}
const state: State = {
  username: "iXiao",
  count: 0
};
const getters: GetterTree<State, any> = {
  username: (state: State) => state.username,
  count: (state: State) => state.count
};

const mutations: MutationTree<State> = {
  UPDATE_USERNAME(state: State, username: string) {
    state.username = username;
  },
  UPDATE_COUNT(state: State, count: number) {
    state.count = count;
  }
};

const actions: ActionTree<State, any> = {
  updateUserName(context: { commit: Commit }, username: string) {
    context.commit("UPDATE_USERNAME", username);
  },
  updateCount(context: { commit: Commit }, count: number) {
    context.commit("UPDATE_COUNT", count);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
