<template>
  <div id="NotFoundMessage">
    <h4>There is nothing here for the url : {{ url }}</h4>
    <button>
      <router-link to="/characters" class="nav-link">
        <i class="bi-arrow-left-square"></i> Back to Characters List
      </router-link>
    </button>
    <img src="../assets/503.png" class="card-img-top" />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFound",
  data() {
    return {
      url: this.$route.params.pathMatch[0],
    };
  },
});
</script>

<style scoped>
#NotFoundMessage,
.card-img-top {
  margin-top: 95px;
}
</style>
