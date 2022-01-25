<template>
  <div id="characterPage" class="container-fluid">
    <button id="backButtonToCharactersList">
      <router-link to="/characters" class="nav-link">
        <i class="bi-arrow-left-square"></i> Back to Characters List
      </router-link>
    </button>
    <div id="cardSection">
      <transition name="bounce">
        <div
          v-if="!isCharacterLoading"
          v-show="!isCharacterLoading"
          class="row cardProfil"
        >
          <div class="col-md-4 col-sm-12">
            <div class="card characterDetails" style="width: 18rem">
              <h3 class="card-title">{{ character.name }}</h3>
              <img
                :src="character.image"
                class="card-img-top"
                :alt="character.name"
              />
            </div>
          </div>
          <div class="col-md-4 col-sm-12 row">
            <h5 class="col-12 card-title">Biographical information</h5>
            <p id="statusInfoLabel" class="col-6 card-text labelInfo">
              <i class="bi-exclude"></i> status :
            </p>
            <p id="statusInfo" class="col-6 card-text">
              {{ characterInfoFormat(character.status) }}
            </p>

            <p id="speciesInfoLabel" class="col-6 card-text labelInfo">
              <i class="bi-person"></i> species :
            </p>
            <p id="speciesInfo" class="col-6 card-text">
              {{ characterInfoFormat(character.species) }}
            </p>

            <p id="typeInfoLabel" class="col-6 card-text labelInfo">type :</p>
            <p id="typeInfo" class="col-6 card-text">
              {{ characterInfoFormat(character.type) }}
            </p>

            <p id="genderInfoLabel" class="col-6 card-text labelInfo">
              <i class="bi-gender-trans"></i> gender :
            </p>
            <p id="genderInfo" class="col-6 card-text">
              {{ characterInfoFormat(character.gender) }}
            </p>

            <p
              v-if="character.origin"
              id="locationInfoLabel"
              class="col-6 card-text labelInfo"
            >
              <i class="bi-pin-map-fill"></i> location :
            </p>
            <p id="locationInfo" class="col-6 card-text">
              {{ characterInfoFormat(character.location.name) }}
            </p>

            <p
              v-if="character.origin"
              id="originInfoLabel"
              class="col-6 card-text labelInfo"
            >
              <i class="bi-globe"></i> origin :
            </p>
            <p id="originInfo" class="col-6 card-text">
              {{ characterInfoFormat(character.origin.name) }}
            </p>
          </div>
          <div class="col-md-4 col-sm-12 row">
            <h5 class="col-12 card-title">Meta information</h5>
            <p
              v-if="character.episode"
              id="episodesInfoLabel"
              class="col-6 card-text labelInfo"
            >
              <i class="bi-film"></i> episodes :
            </p>
            <p id="episodesInfo" class="col-6 card-text">
              {{ characterInfoFormat(character.episode.length) }}
              <span
                v-if="character.episode.length > 1"
                id="seeAllEpisodes"
                class="badge badge-info"
                @click="showEpiodesDetails(character)"
                >see all <i class="bi-arrow-down-circle-fill"></i
              ></span>
              <span
                v-if="character.episode.length === 1"
                id="seeAllEpisodes"
                class="badge badge-info"
                @click="showEpiodesDetails(character)"
                >see it <i class="bi-arrow-down-circle-fill"></i
              ></span>
            </p>
            <p id="createdInfoLabel" class="col-6 card-text labelInfo">
              <i class="bi-watch"></i> created :
            </p>
            <p id="createdInfo" class="col-6 card-text">
              {{ getDate(character.created) }}
            </p>
          </div>
        </div>
      </transition>

      <div class="row justify-content-md-center">
        <transition name="bounce">
          <div v-if="epidodesDetailsDone && show" class="col-md-6 col-sm-12">
            <h4 id="episodesDiagTitle">
              Episodes where
              <span id="characterNameDiag">{{ character.name }}</span> appears
            </h4>
            <CharacterEpisodesDiag :episodes="episodesDetails" />
          </div>
        </transition>
      </div>
      <div
        id="episodeCharactersComponent"
        class="row justify-content-md-center"
      >
        <transition name="bounce">
          <div
            v-if="episodeCharacters.length > 0 && showEpisodeCharacters"
            class="col"
          >
            <h4>
              All charaters whose appear in episode
              <span id="episodeTrombi">{{ episodeSelected.name }}</span> ({{
                episodeSelected.episode
              }})
            </h4>
            <EpisodeCharacters :characters="episodeCharacters" />
          </div>
        </transition>
      </div>
    </div>
  </div>
  <div v-if="isCharacterLoading && req_status !== 404">
    <CharacterCardSkeleton />
  </div>
  <div>
    <NetworkErrors :req_status="req_status" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import CharacterCardSkeleton from "./CharacterCardSkeleton.vue";
import CharacterEpisodesDiag from "./CharacterEpisodesDiag.vue";
import EpisodeCharacters from "./EpisodeCharacters.vue";
import { Character } from "../../models/interfaces";
import utils from "../../utils/utils";

export default defineComponent({
  name: "Character",
  components: {
    CharacterCardSkeleton,
    CharacterEpisodesDiag,
    EpisodeCharacters,
  },
  data() {
    return {
      show: false,
      showComponent: false,
    };
  },
  computed: {
    ...mapState([
      "character",
      "isCharacterLoading",
      "req_status",
      "episodesDetails",
      "epidodesDetailsDone",
      "episodeCharacters",
      "episodeSelected",
      "showEpisodeCharacters",
    ]),
  },
  mounted() {
    this.$store.dispatch("loadCharacter", this.$route.params.id);
  },
  activated() {
    this.showComponent = true;
  },
  unmounted() {
    this.showComponent = false;
  },
  methods: {
    getDate(date: Date) {
      return utils.formatDate(date);
    },
    characterInfoFormat(info: string) {
      return info !== "" ? info : "not specified";
    },
    showEpiodesDetails(character: Character) {
      this.show = true;

      this.$store.dispatch("showEpisodeCharacters", false);
      this.$store.dispatch("getEpisodesDetails", character);
    },
  },
});
</script>

<style scoped>
#characterPage {
  margin-top: 75px;
}

#backButtonToCharactersList {
  margin-top: 15px;
}

#cardSection {
  margin-top: 35px;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  padding: 5px;
}

.bounce-enter-active {
  animation: bounce-in 2s;
}
.bounce-leave-active {
  animation: bounce-in 2s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.card,
.cardProfil {
  background: var(--theme-page-background-color-secondary);
  border: 1px solid #03afc9;
  border-collapse: collapse;
  box-shadow: 0 0 5px #03afc9;
}

.cardProfil {
  padding: 15px;
  margin-top: 10px;
}

.card-title,
#episodesDiagTitle {
  text-align: center;
}

.labelInfo {
  text-align: right;
  text-decoration: underline #03afc9;
}

#episodesDiagTitle,
#episodeCharactersComponent {
  margin-top: 15px;
}

#seeAllEpisodes {
  /* animation: bounce2 2s ease infinite; */
}

@keyframes bounce2 {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
</style>
