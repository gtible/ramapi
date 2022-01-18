<template>
    <div class="card">
        <img :src="src" class="card-img-top" :alt="alt">
        <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text badge statusLabel" :class="className" >{{status}} </p>

            <router-link class="btn btn-primary linkToCharacterDetails" 
                :to="{ name: 'character', params: { id: id }}">
                details +
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name:'CharactersListCard',
    props: {
        id:Number,
        src:String,
        alt:String,
        title:String,
        className:String,
        status:String,  
    }
}
</script>

<style scoped>
.card img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  padding: 5px;
  width: 150px;
}

.card {
    max-width: 10rem;
    background: var(--theme-page-background-color-secondary);
    border: 1px solid #03afc9;
    border-collapse: collapse;
    margin: 0 5px 10px 20px;
}

.card:hover {
    box-shadow: 0 0 5px #03AFC9;
}

.cardCharacter {
    margin: 5px;
}

.card-title {
    min-height: 80px;
     /* font-family: "RickAndMorty", Helvetica, Arial; */
}

</style>