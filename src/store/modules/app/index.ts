import { State } from "./interface";
import { Commit } from "vuex";

const state: State = {
  count: 0,
  message: "1111",
  test1: []
};

const getters = {
  count: (state: State) => state.count,
  message: (state: State) => state.message
};

const mutations = {
  INCREMENT(state: State, num: number) {
    state.count += num;
  },
  UPDATE_MSG(state: State, msg: string) {
    state.message = msg;
  }
};

const actions = {
  updateMsg(context: { commit: Commit }, msg: string) {
    context.commit("UPDATE_MSG", msg);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
