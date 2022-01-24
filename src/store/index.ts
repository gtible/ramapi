import { createStore, MutationTree, Commit } from "vuex";
import axios from "axios";
import {
  Character,
  CharacterFilter,
  Episode,
  Info,
} from "../models/interfaces";
import { MutationTypes } from "./mutation-types";
import { Mutations } from "./mutation";
import { State } from "./state";

function buildListWithNumberInURL(array: Array<string>) {
  let list = "";

  array.forEach((element: string) => {
    list += element.replace(/\D/g, "") + ",";
  });

  list = list.slice(0, -1);

  return list;
}

//to handle state
const state = {
  character: {} as Character,
  characters: [] as Character[],
  info: {},
  query: {},
  activeFilters: [],
  req_status: 200,
  search: "",
  status: "",
  isCharacterLoading: true,
  isCharactersListLoading: true,
  episodeCharacters: [] as Character[],
  episodesDetails: [] as Episode[],
  epidodesDetailsDone: false,
  episodeSelected: {},
  showEpisodeCharacters: false,
};

//to handle state
const getters = {
  characters(state: State) {
    return state.characters;
  },
  info(state: State) {
    return state.info;
  },
  req_status(state: State) {
    return state.req_status;
  },
  character(state: State) {
    return state.character;
  },
  search(state: State) {
    return state.search;
  },
  status(state: State) {
    return state.status;
  },
};

const actions = {
  async loadData({ commit }: { commit: Commit }) {
    if (state.characters.length > 0) {
      commit("SET_CHARACTERS", state.characters);
      commit("SET_INFO", state.info);
      commit("SET_REQ_STATUS", 200);
      commit("SET_SEARCH", state.search);
    } else {
      await axios
        .get(`https://rickandmortyapi.com/api/character/`)
        .then((response) => {
          return response;
        })
        .then((characters) => {
          commit("SET_CHARACTERS", characters.data.results);
          commit("SET_INFO", characters.data.info);
          commit("SET_REQ_STATUS", characters.status);
        })
        .catch((err) => {
          if (err === "Error: Request failed with status code 404")
            commit("SET_REQ_STATUS", 404);
          else commit("SET_REQ_STATUS", 503);
        });
    }
    commit("SET_CHARACTERS_LOADING", false);
  },
  async loadCharacter({ commit }: { commit: Commit }, payload: string) {
    await axios
      .get(`https://rickandmortyapi.com/api/character/${parseInt(payload)}`)
      .then((response) => {
        return response;
      })
      .then((character) => {
        commit("SET_CHARACTER", character.data);
        commit("SET_EPISODES_DETAILS", []);
        commit("SET_EPISODES_DETAILS_DONE", false);
        commit("SET_CHARACTER_LOADING", false);
      })
      .catch((err) => {
        if (err === "Error: Request failed with status code 404")
          commit("SET_REQ_STATUS", 404);
        else commit("SET_REQ_STATUS", 503);
      });
  },
  async getSearchResults(
    { commit }: { commit: Commit },
    query: CharacterFilter
  ) {
    let newQuery = "";
    if (query.name !== "") newQuery += `name=${query.name}`;
    if (query.status !== "") newQuery += `&status=${query.status}`;

    await axios
      .get(`https://rickandmortyapi.com/api/character/?${newQuery}`)
      .then((response) => response)
      .then((characters) => {
        commit("SET_SEARCH", query.name);
        commit("SET_STATUS", query.status);
        if (characters.status === 404) {
          commit("SET_REQ_STATUS", characters.status);
        } else {
          commit("SET_CHARACTERS", characters.data.results);
          commit("SET_INFO", characters.data.info);
          commit("SET_REQ_STATUS", characters.status);
        }
      })
      .catch((err) => {
        if (err === "Error: Request failed with status code 404")
          commit("SET_REQ_STATUS", 404);
        else commit("SET_REQ_STATUS", 503);
      });
  },
  getPageResults({ commit }: { commit: Commit }, query: CharacterFilter) {
    axios
      .get(`https://rickandmortyapi.com/api/character/?${query}`)
      .then((response) => response)
      .then((characters) => {
        commit("SET_CHARACTERS", characters.data.results);
        commit("SET_INFO", characters.data.info);
      })
      .catch((err) => {
        if (err === "Error: Request failed with status code 404")
          commit("SET_REQ_STATUS", 404);
        else commit("SET_REQ_STATUS", 503);
      });
  },
  getEpisodesDetails({ commit }: { commit: Commit }, character: Character) {
    const episodesList: string = buildListWithNumberInURL(character.episode);

    axios
      .get(`https://rickandmortyapi.com/api/episode/${episodesList}`)
      .then((response) => response.data)
      .then((episodesDetails) => {
        commit("SET_EPISODES_DETAILS", episodesDetails);
        commit("SET_EPISODES_DETAILS_DONE", true);
      })
      .catch((err) => {
        if (err === "Error: Request failed with status code 404")
          commit("SET_REQ_STATUS", 404);
        else commit("SET_REQ_STATUS", 503);
      });
  },
  getEpisodeCharacters({ commit }: { commit: Commit }, episode: Episode) {
    let charactersList = "";

    episode.characters.forEach((element: string) => {
      charactersList += element.replace(/\D/g, "") + ",";
    });

    charactersList = charactersList.slice(0, -1);

    axios
      .get(`https://rickandmortyapi.com/api/character/${charactersList}`)
      .then((response) => response.data)
      .then((episodeCharacters) => {
        commit("SET_EPISODE_CHARACTERS", episodeCharacters);
      })
      .catch((err) => {
        if (err === "Error: Request failed with status code 404")
          commit("SET_REQ_STATUS", 404);
        else commit("SET_REQ_STATUS", 503);
      });
  },
  setEpisodeSelected({ commit }: { commit: Commit }, episode: Episode) {
    commit("SET_EPISODE_SELECTED", episode);
  },
  setCharacter({ commit }: { commit: Commit }, character: Character) {
    commit("SET_CHARACTER", character);
    this.dispatch("getEpisodesDetails", character);
  },
  showEpisodeCharacters({ commit }: { commit: Commit }, show: boolean) {
    commit("SET_SHOW_EPISODE_CHARACTERS", show);
  },
};

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_INFO](state: State, info: Info<string>): void {
    state.info = info;
  },
  [MutationTypes.SET_REQ_STATUS](state: State, req_status: number): void {
    state.req_status = req_status;
  },
  [MutationTypes.SET_SEARCH](state: State, search: string): void {
    state.search = search;
  },
  [MutationTypes.SET_STATUS](state: State, status: string): void {
    state.status = status;
  },
  [MutationTypes.SET_CHARACTERS](state: State, characters: Character[]): void {
    state.characters = characters;
  },
  [MutationTypes.SET_CHARACTERS_LOADING](
    state: State,
    isLoading: boolean
  ): void {
    state.isCharactersListLoading = isLoading;
  },
  [MutationTypes.SET_CHARACTER](state: State, character: Character): void {
    state.character = character;
  },
  [MutationTypes.SET_CHARACTER_BY_SEARCH](
    state: State,
    characters: Character[]
  ): void {
    state.characters = characters;
  },
  [MutationTypes.SET_CHARACTER_LOADING](
    state: State,
    isLoading: boolean
  ): void {
    state.isCharacterLoading = isLoading;
  },
  [MutationTypes.SET_EPISODES_DETAILS](
    state: State,
    episodesDetails: Episode[]
  ): void {
    state.episodesDetails = episodesDetails;
  },
  [MutationTypes.SET_EPISODES_DETAILS_DONE](state: State, done: boolean): void {
    state.epidodesDetailsDone = done;
  },
  [MutationTypes.SET_EPISODE_CHARACTERS](
    state: State,
    characters: Character[]
  ): void {
    state.episodeCharacters = characters;
  },
  [MutationTypes.SET_EPISODE_SELECTED](state: State, episode: Episode): void {
    state.episodeSelected = episode;
  },
  [MutationTypes.SET_SHOW_EPISODE_CHARACTERS](
    state: State,
    show: boolean
  ): void {
    state.showEpisodeCharacters = show;
  },
};

//export store module
export default createStore({
  state,
  getters,
  actions,
  mutations,
});
