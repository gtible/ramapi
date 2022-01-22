<template>
  <div >
    <nav id="header" class="nav navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/characters" class="navbar-brand">
        <img class="RMLogo" src="https://img.icons8.com/plasticine/100/000000/rick-sanchez.png"/>
        <img id="RMLogoText" src="@/assets/rmLogo.png"/>
        <img class="RMLogo" src="https://img.icons8.com/color/48/000000/morty-smith.png"/>
      </router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          
        </li>
      </div>
      <ul class="navbar-nav">
        <li class="nav-item">
          <i  id="audioRun" class="nav-link bi-caret-right-square" @click="audioRun()"></i>
      </li>
      <li class="nav-item">
        <i  id="audioPause" class="nav-link bi-pause-circle-fill" @click="audioPause()" ></i>
      </li>
      </ul>
      
    </nav>

    <div class="container">
      <transition name="fade" mode="out-in">
       <router-view />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "app",
  data() {
    return {
      audioElement: new Audio('https://ia600900.us.archive.org/32/items/tvtunes_27340/Rick%20and%20Morty.mp3'),
      audioOn: true,
    }
  },
    mounted() {
      this.audioElement.play();
  },
  methods: {
    audioPause() {
      this.audioElement.pause()
      this.audio = false;
    },
    audioRun() {
      this.audioElement.play();
      this.audio = true;
    }
  }
};
</script>
<style>

@font-face {
  font-family: "RickAndMorty";
  src: local("RickAndMorty"),   url(./assets/fonts/get-schwifty.ttf) format("truetype");

}

.container {

      /* background:  url('./assets/univers.jpg') */

}

.RMLogo {
  width: 50px;
}

#RMLogoText {
  width: 100px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#audioRun {
  color:white;
  float: right;
}

#header {
  overflow: hidden;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  z-index: 3;
}



@media screen and (max-width: 575px)
{
    /* Rédigez vos propriétés CSS ici */
   #header {
  overflow: hidden;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  z-index: 3;
}
}

</style>