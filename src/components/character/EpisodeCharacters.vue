<template>
  <div class="row justify-content-start cardEpisodeCharacters">
    <div v-for="character in characters" :key="character.id">
      <router-link :to="{ name: 'character', params: { id: character.id } }">
        <div class="card col" @click="setCharacter(character)">
          <img
            v-if="character.image != null"
            :src="character.image"
            class="card-img-top-episode_character"
            :alt="character.name"
          />
          <div v-else class="card-img-top-episode_character imgSkeleton"></div>
          <div class="">
            <h5 class="card-title">{{ character.name }}</h5>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "EpisodeCharacters",
  props: {
    characters: Array,
  },
  methods: {
    setCharacter(character) {
      this.$store.dispatch("setCharacter", character);
    },
  },
};
</script>

<style scoped>
.card {
  width: 100px;
}

.card-img-top-episode_character {
  padding-top: 10px;
}

.card-title {
  font-size: 0%;
}

.imgSkeleton {
  background-color: grey;
  width: 80px;
  height: 80px;
}

.card {
  margin: 0px 3px 3px 0px;
}
.card:hover {
  box-shadow: 0 0 5px #03afc9;
}
</style>
