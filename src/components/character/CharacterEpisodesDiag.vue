<template>
  <div class="allEpisodes">
      <div class="season">
        <div class="season_title">Episodes</div> 
            <div v-for="i in range(1, 11)" :key="i" class="episodes">
                <div class="episodeNumber episodeNumberLine">
                    {{i}}
                </div>
            </div>    
        </div>  

      <div class="season">
        <div class="season_title">Season 1</div> 
            <div v-for="i in range(1, 11)" :key="i" class="episodes">
                <div class="episode" :class="epColor(formatEpisodesDetails[i])">
                    
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
        <div class="season_title">Season 2</div> 
        <div v-for="i in range(12, 21)" :key="i" class="episodes">
            <div class="episode" :class="epColor(formatEpisodesDetails[i])">
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
        <div class="season_title">Season 3</div> 
        <div v-for="i in range(22, 31)" :key="i" class="episodes">
            <div class="episode" :class="epColor(formatEpisodesDetails[i])">
                
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
        <div class="season_title">Season 4</div> 
        <div v-for="i in range(32, 41)" :key="i" class="episodes">
            <div class="episode" :class="epColor(formatEpisodesDetails[i])">
               
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
        <div class="season_title">Season 5</div> 
        <div v-for="i in range(42, 51)" :key="i" class="episodes">
            <div class="episode" :class="epColor(formatEpisodesDetails[i])">
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
    margin: 0 5px 10px 20px;
padding: 15px;
}

.episodeNumber {
    font-size: 10px;
    text-align: center;
}

.season {
    display: flex;
}

.season_title {
    width: 70px;
    float: left;
    margin-right: 5px;
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
</style>