import { createStore } from "vuex";
import axios from 'axios'
import { Character, CharacterFilter } from '../models/interfaces'

//to handle state
const state = {
    character: {} as Character,
    characters: [] as Character[] ,
    info: {},
    query: {},
    activeFilters: [],
    req_status: "",
    isCharacterLoading: true,
    isCharactersListLoading: true,
    epidodesDetails: [],
    epidodesDetailsDone: false,
    search: "",
    status: "",
}

//to handle state
const getters = {
    characters(state:any) {   
        return state.characters;    
    },
    info(state:any) {
        return state.info;    
    },
    req_status(state:any) {
        return state.req_status;    
    },
    character(state:any) {
        return state.character;    
    },
    search(state:any) {
        return state.search;    
    },
    status(state:any) {
        return state.status;    
    },
    searchResult(state:any) {
        return state.results
    }
}

//to handle actions
const actions = {
    async loadData({commit}:any) {
        if (state.characters.length > 0) {
            commit('SET_CHARACTERS', state.characters)
            commit('SET_INFO', state.info)
            commit('SET_REQ_STATUS', 200)
            commit('SET_SEARCH', state.search)
        } else {
            await axios.get(
                  `https://rickandmortyapi.com/api/character/`
                )
                .then(response => {
                    return response
                })
                .then(characters => {
                    commit('SET_CHARACTERS', characters.data.results)
                    commit('SET_INFO', characters.data.info)
                    commit('SET_REQ_STATUS', characters.status)
                }).catch(err => {
                    if (err == "Error: Request failed with status code 404")
                        commit('SET_REQ_STATUS', 404)
                    else
                        commit('SET_REQ_STATUS', 503)
                }) 
        }
        commit('SET_CHARACTERS_LOADING', false)
    },
    async loadCharacter({commit}:any, payload:any) {
        await axios.get(
            `https://rickandmortyapi.com/api/character/${parseInt(payload)}`
          )
          .then(response => {
            return response
          })
          .then(character => {
            commit('SET_CHARACTER', character.data)
            commit('SET_EPISODES_DETAILS', [])
            commit('SET_EPISODES_DETAILS_DONE', false)
            commit('SET_CHARACTER_LOADING', false)
          }).catch(err => {
            if (err == "Error: Request failed with status code 404")
                commit('SET_REQ_STATUS', 404)
            else
                commit('SET_REQ_STATUS', 503)
        }) 
    },
    async getSearchResults({commit}:any, query:CharacterFilter) {
        let newQuery = '';
        if (query.name != "")
            newQuery+= `name=${query.name}`;
        if (query.status != "")
            newQuery+= `&status=${query.status}`;
        
        
        await axios.get(
          `https://rickandmortyapi.com/api/character/?${newQuery}`
        )
        .then(response => response)
        .then(characters => {
            commit('SET_SEARCH', query.name)
            commit('SET_STATUS', query.status)
            if (characters.status === 404) {
                commit('SET_REQ_STATUS', characters.status)
            } else {
                commit('SET_CHARACTERS', characters.data.results)
                commit('SET_INFO', characters.data.info)
                commit('SET_REQ_STATUS', characters.status)
            }    
        }).catch(err => {
            if (err == "Error: Request failed with status code 404")
                commit('SET_REQ_STATUS', 404)
            else
                commit('SET_REQ_STATUS', 503)
        })  
    },
    getPageResults({commit}:any, query:CharacterFilter) {
        axios.get(
            `https://rickandmortyapi.com/api/character/?${query}`)
            .then(response => response)
            .then(characters => {
                
                commit('SET_CHARACTERS', characters.data.results)
                commit('SET_INFO', characters.data.info)
            }).catch(err => {
                if (err == "Error: Request failed with status code 404")
                    commit('SET_REQ_STATUS', 404)
                else
                    commit('SET_REQ_STATUS', 503)
            }) 
    },
    getEpisodesDetails({commit}:any, episodes:string) {
        axios.get(
            `https://rickandmortyapi.com/api/episode/${episodes}`)
            .then(response => response.data)
            .then(episodesDetails => {
                commit('SET_EPISODES_DETAILS', episodesDetails)
                commit('SET_EPISODES_DETAILS_DONE', true)
            }).catch(err => {
                if (err == "Error: Request failed with status code 404")
                    commit('SET_REQ_STATUS', 404)
                else
                    commit('SET_REQ_STATUS', 503)
            }) 
    },
}

//to handle mutations
const mutations = {
    SET_CHARACTERS(state:any, characters:Character[]) {
        state.characters = characters
    },
    SET_CHARACTERS_LOADING(state:any, isLoading:Boolean) {
        state.isCharactersListLoading = isLoading;
    },
    SET_INFO(state:any, info:any) {
        state.info = info
    },
    SET_REQ_STATUS(state:any, req_status:Number) {
        state.req_status = req_status
    },
    SET_CHARACTER(state:any, character:Character) {
        state.character = character
    },
    SET_CHARACTER_BY_SEARCH(state:any, characters:Character[]) {
        state.characters = characters
    },
    SET_CHARACTER_LOADING(state:any, isLoading:Boolean) {
        state.isCharacterLoading = isLoading;
    },
    SET_EPISODES_DETAILS(state:any, episodesDetails:any) {
        state.episodesDetails = episodesDetails;
    },
    SET_EPISODES_DETAILS_DONE(state:any, done:Boolean) {
        state.epidodesDetailsDone = done;
    },
    SET_SEARCH(state:any, search:string) {
        state.search = search;
    },
    SET_STATUS(state:any, status:string) {
        state.status = status;
    },
}

//export store module
export default createStore({
    state,
    getters,
    actions,
    mutations
})