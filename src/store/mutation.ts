import { MutationTypes } from "./mutation-types";
import { State } from "./state";
import { Character, Episode, Info } from "../models/interfaces";

export type Mutations<S = State> = {
  [MutationTypes.SET_INFO](state: S, info: Info<string>): void;
  [MutationTypes.SET_REQ_STATUS](state: S, req_status: number): void;
  [MutationTypes.SET_SEARCH](state: S, search: string): void;
  [MutationTypes.SET_STATUS](state: S, status: string): void;
  [MutationTypes.SET_CHARACTERS](state: S, characters: Character[]): void;
  [MutationTypes.SET_CHARACTERS_LOADING](state: S, isLoading: boolean): void;
  [MutationTypes.SET_CHARACTER](state: S, character: Character): void;
  [MutationTypes.SET_CHARACTER_BY_SEARCH](
    state: S,
    characters: Character[]
  ): void;
  [MutationTypes.SET_CHARACTER_LOADING](state: S, isLoading: boolean): void;
  [MutationTypes.SET_EPISODES_DETAILS](
    state: S,
    episodesDetails: Episode[]
  ): void;
  [MutationTypes.SET_EPISODES_DETAILS_DONE](state: S, done: boolean): void;
  [MutationTypes.SET_EPISODE_CHARACTERS](
    state: S,
    characters: Character[]
  ): void;
  [MutationTypes.SET_EPISODE_SELECTED](state: S, episode: Episode): void;
  [MutationTypes.SET_SHOW_EPISODE_CHARACTERS](state: S, show: boolean): void;
};
