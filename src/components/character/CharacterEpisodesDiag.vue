<template>
  <div class="allEpisodes">
      <div class="season">
        <div class="season_title">Ep</div> 
            <div v-for="i in range(1, 11)" :key="i" class="episodes">
                <div class="episodeNumber episodeNumberLine">
                    {{i}}
                </div>
            </div>    
        </div>  

      <div class="season">
        <div class="season_title">S1</div> 
            <div v-for="i in range(1, 11)" :key="i" class="episodes">
                <div class="episode" :class="epColor(formatEpisodesDetails[i]) " @click="getAllCharactersInEpisode(formatEpisodesDetails[i])">
                    
                    <VTooltip v-if="formatEpisodesDetails[i] != null">
                        <a class="episodeNumber">ep{{i}}</a>
                        <template #popper>
                            <span >{{formatEpisodesDetails[i].name}}</span>
                        </template>
                    </VTooltip>

                   
                </div>
            </div>    
        </div>    

    <div class="season">
        <div class="season_title">S2</div> 
        <div v-for="i in range(12, 21)" :key="i" class="episodes">
            <div class="episode" :class="epColor(formatEpisodesDetails[i]) " @click="getAllCharactersInEpisode(formatEpisodesDetails[i])">
                     <VTooltip v-if="formatEpisodesDetails[i] != null">
                        <a class="episodeNumber">ep{{i}}</a>
                        <template #popper>
                            <span >{{formatEpisodesDetails[i].name}}</span>
                        </template>
                    </VTooltip>
                </div>
        </div>    
      </div>    

          <div class="season">
        <div class="season_title">S3</div> 
        <div v-for="i in range(22, 31)" :key="i" class="episodes">
            <div class="episode" :class="epColor(formatEpisodesDetails[i]) " @click="getAllCharactersInEpisode(formatEpisodesDetails[i])">
                
                    <VTooltip v-if="formatEpisodesDetails[i] != null">
                        <a class="episodeNumber">ep{{i}}</a>
                        <template #popper>
                            <span >{{formatEpisodesDetails[i].name}}</span>
                        </template>
                    </VTooltip>
                </div>
        </div>    
      </div>    

          <div class="season">
        <div class="season_title">S4</div> 
        <div v-for="i in range(32, 41)" :key="i" class="episodes">
            <div class="episode" :class="epColor(formatEpisodesDetails[i]) " @click="getAllCharactersInEpisode(formatEpisodesDetails[i])">
               
                    <VTooltip v-if="formatEpisodesDetails[i] != null">
                        <a class="episodeNumber">ep{{i}}</a>
                        <template #popper>
                            <span >{{formatEpisodesDetails[i].name}}</span>
                        </template>
                    </VTooltip>
                </div>
        </div>    
      </div>    

          <div class="season">
        <div class="season_title">S5</div> 
        <div v-for="i in range(42, 51)" :key="i" class="episodes">
            <div class="episode" :class="epColor(formatEpisodesDetails[i]) " @click="getAllCharactersInEpisode(formatEpisodesDetails[i])">
                    <VTooltip v-if="formatEpisodesDetails[i] != null">
                        <a class="episodeNumber">ep{{i}}</a>
                        <template #popper>
                            <span >{{formatEpisodesDetails[i].name}}</span>
                        </template>
                    </VTooltip>
                </div>
        </div>    
      </div>      
  </div>   
</template>

<script>
export default {
    name:"EpisodeDiag",
    props: {
        episodes: []
    },
    data () {
        return {
            
        }
    },
    computed: {
        formatEpisodesDetails() {
           
            let formatEpisodes = {};
            
            if (this.episodes.length > 0) {
                this.episodes.map(function(episode) {
                    formatEpisodes[episode.id] = episode;
                })
            } else {
                formatEpisodes[this.episodes.id] = this.episodes;
            }
       
            return formatEpisodes;
        }
    },
    methods: {
        range : function (start, end) {
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
        },
        epColor(ep) {
            if (ep)
                return 'success'
        },
        getAllCharactersInEpisode(episode) {
            let charactersList = "";

            episode.characters.forEach((element) => {
                charactersList += element.replace(/\D/g, "")+',';
            });
            
            charactersList = charactersList.slice(0, -1)

            this.$store.dispatch('setEpisodeSelected', episode)
            this.$store.dispatch('getEpisodeCharacters', charactersList)
            this.$store.dispatch('showEpisodeCharacters', true)
        } 
    }
}
</script>

<style scoped>
.allEpisodes {
    background: var(--theme-page-background-color-secondary);
    border: 1px solid #03afc9;
    border-collapse: collapse;
    box-shadow: 0 0 5px #03AFC9;
    /* margin: 0 5px 10px 20px; */
    padding: 10px;
    width: fit-content;
}

.episodeNumber {
    font-size: 10px;
    text-align: center;
}

.season {
    display: flex;
}

.season_title {
    font-size: 12px;
    width: 13px;
    /* float: left;
    margin-right: 5px; */
}

.episode {
    /* display: inline-block; */
    float: left;
    height: 25px;
    width:25px;
    background-color: grey;
    margin: 3px;
}

.episodeNumberLine {
    text-align:center;
    margin-left: 12px;
}

.episodeNumber {
    /* display: inline-block; */
    float: left;
    height: 25px;
    width:25px;
    
    margin: 3px;
}

.episode:hover {
   background-color: rgb(218, 214, 214)
}

.success {
    background-color: green;
}

@media screen and (max-width: 575px)
{
    .episodeNumber {
    /* display: inline-block; */
    float: left;
    height: 20px;
    width:20px;
    margin: 3px;
    }

    .episode {
        /* display: inline-block; */
        float: left;
        height: 20px;
        width:  20px;
        background-color: grey;
        margin: 3px;
    }
}
</style>