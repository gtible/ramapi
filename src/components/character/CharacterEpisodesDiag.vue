<template>
  <div class="allEpisodes">
    <div class="season">
      <div class="season_title">Ep</div>
      <div v-for="i in range(1, 11)" :key="i" class="episodes">
        <div class="episodeNumber episodeNumberLine">
          {{ i }}
        </div>
      </div>
    </div>

    <div class="season">
      <div class="season_title">S1</div>
      <div v-for="i in range(1, 11)" :key="i" class="episodes">
        <div
          class="episode"
          :class="epColor(formatEpisodesDetails[i])"
          @click="getAllCharactersInEpisode(formatEpisodesDetails[i])"
        >
          <VTooltip v-if="formatEpisodesDetails[i] != null">
            <a class="episodeNumber">e{{ i }}</a>
            <template #popper>
              <span>{{ formatEpisodesDetails[i].name }}</span>
            </template>
          </VTooltip>
        </div>
      </div>
    </div>

    <div class="season">
      <div class="season_title">S2</div>
      <div v-for="i in range(12, 21)" :key="i" class="episodes">
        <div
          class="episode"
          :class="epColor(formatEpisodesDetails[i])"
          @click="getAllCharactersInEpisode(formatEpisodesDetails[i])"
        >
          <VTooltip v-if="formatEpisodesDetails[i] != null">
            <a class="episodeNumber">e{{ i }}</a>
            <template #popper>
              <span>{{ formatEpisodesDetails[i].name }}</span>
            </template>
          </VTooltip>
        </div>
      </div>
    </div>

    <div class="season">
      <div class="season_title">S3</div>
      <div v-for="i in range(22, 31)" :key="i" class="episodes">
        <div
          class="episode"
          :class="epColor(formatEpisodesDetails[i])"
          @click="getAllCharactersInEpisode(formatEpisodesDetails[i])"
        >
          <VTooltip v-if="formatEpisodesDetails[i] != null">
            <a class="episodeNumber">e{{ i }}</a>
            <template #popper>
              <span>{{ formatEpisodesDetails[i].name }}</span>
            </template>
          </VTooltip>
        </div>
      </div>
    </div>

    <div class="season">
      <div class="season_title">S4</div>
      <div v-for="i in range(32, 41)" :key="i" class="episodes">
        <div
          class="episode"
          :class="epColor(formatEpisodesDetails[i])"
          @click="getAllCharactersInEpisode(formatEpisodesDetails[i])"
        >
          <VTooltip v-if="formatEpisodesDetails[i] != null">
            <a class="episodeNumber">e{{ i }}</a>
            <template #popper>
              <span>{{ formatEpisodesDetails[i].name }}</span>
            </template>
          </VTooltip>
        </div>
      </div>
    </div>

    <div class="season">
      <div class="season_title">S5</div>
      <div v-for="i in range(42, 51)" :key="i" class="episodes">
        <div
          class="episode"
          :class="epColor(formatEpisodesDetails[i])"
          @click="getAllCharactersInEpisode(formatEpisodesDetails[i])"
        >
          <VTooltip v-if="formatEpisodesDetails[i] != null">
            <a class="episodeNumber">e{{ i }}</a>
            <template #popper>
              <span>{{ formatEpisodesDetails[i].name }}</span>
            </template>
          </VTooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EpisodeDiag",
  props: {
    episodes: [],
  },
  data() {
    return {};
  },
  computed: {
    formatEpisodesDetails() {
      let formatEpisodes = {};

      if (this.episodes.length > 0) {
        this.episodes.map(function (episode) {
          formatEpisodes[episode.id] = episode;
        });
      } else {
        formatEpisodes[this.episodes.id] = this.episodes;
      }

      return formatEpisodes;
    },
  },
  methods: {
    range: function (start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    },
    epColor(ep) {
      return ep ? "success" : "";
    },
    getAllCharactersInEpisode(episode) {
      this.$store.dispatch("setEpisodeSelected", episode);
      this.$store.dispatch("getEpisodeCharacters", episode);
      this.$store.dispatch("showEpisodeCharacters", true);
    },
  },
};
</script>

<style scoped>
.allEpisodes {
  background: var(--theme-page-background-color-secondary);
  border: 1px solid #03afc9;
  border-collapse: collapse;
  box-shadow: 0 0 5px #03afc9;
  padding: 10px;
  width: fit-content;
  margin-top: 30px;
}

.episodeNumber {
  font-size: 10px;
  text-align: center;
  color: black;
}

.season {
  display: flex;
}

.season_title {
  font-size: 12px;
  width: 13px;
}

.episode,
.episodeNumber {
  float: left;
  height: 25px;
  width: 25px;
  margin: 3px;
}

.episodeNumberLine {
  text-align: center;
}

.episode {
  background-color: grey;
  color: black;
}

.episode:hover {
  background-color: rgb(218, 214, 214);
}

.success {
  background-color: green;
}

@media screen and (max-width: 575px) {
  .episode,
  .episodeNumber {
    float: left;
    height: 20px;
    width: 20px;
    margin: 3px;
  }

  .episode {
    background-color: grey;
  }

  .episode .episodeNumber {
    font-size: 9px;
    text-align: start;
  }

  .success {
    background-color: green;
  }
}
</style>
