import { Character, Episode } from "../models/interfaces";

export const state = {
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

export type State = typeof state;
