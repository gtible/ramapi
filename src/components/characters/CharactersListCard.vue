<template>
  <div>
    <router-link :to="{ name: 'character', params: { id: id } }">
      <div class="card" @click="initCharacterPage()">
        <img :src="src" class="card-img-top" :alt="alt" />
        <div class="card-body-custom">
          <p class="card-text badge statusLabel" :class="className">
            {{ status }}
          </p>
          <p class="card-title">{{ title }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "CharactersListCard",
  props: {
    id: Number,
    src: String,
    alt: String,
    title: String,
    className: String,
    status: {
      type: String,
      validator(value: string) {
        return ["alive", "dead", "unknown"].includes(value);
      },
    },
  },
  methods: {
    initCharacterPage() {
      this.$store.dispatch("showEpisodeCharacters", false);
    },
  },
};
</script>

<style scoped>
.card img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;

  /* padding: 5px; */
  /* width: 150px; */
}

.card {
  max-width: 10rem;
  background-color: rgb(214, 208, 208);
  /* background: var(--theme-page-background-color-secondary);
  border: 1px solid #03afc9;
  border-collapse: collapse; */
  margin: 0 0 10px 20px;
  /* border-bottom-right-radius: 10%; */
}

/* .card:hover {
  box-shadow: 0 0 5px #03afc9;
} */

.cardCharacter {
  margin: 5px;
}

.card-title {
  min-height: 50px;
  color: black;
  /* font-family: "RickAndMorty", Helvetica, Arial; */
}

.card-body-custom {
  padding: 5px;
}

@media screen and (max-width: 575px) {
  /* Rédigez vos propriétés CSS ici */
  .linkToCharacterDetails {
    display: none;
  }

  .card {
    transition: all linear 0.5s;
  }

  .card-title {
    text-align: center;
    font-size: 15px;
    min-height: 25px;
  }

  .card-body {
    padding: 5px;
  }

  .statusLabel {
    text-align: center;
  }
}
</style>
