<template>
  <div v-if="req_status === 404" id="#error404">
    <span v-if="search !== ''">
      There is nothing here for
      <span id="searchError" class="badge badge-info">{{ search }} </span>
    </span>
    <span v-if="status !== ''">
      with status
      <span class="badge" :class="classStatusColor">
        {{ status }}
      </span>
    </span>
    <img src="../assets/404.jpg" class="card-img-top" />
  </div>

  <div v-if="req_status === 503" id="#error503">
    There is a problem with the network, please check your connection.
    <img src="../assets/503.png" class="card-img-top" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NetworkError",
  props: {
    status: String,
    search: String,
    classStatusColor: String,
    req_status: {
      type: Number,
      require: true,
    },
  },
});
</script>

<style scoped></style>
