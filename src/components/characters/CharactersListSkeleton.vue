<template>
  <div class="row">
    <div class="col" v-for="i in 20" :key="i">
      <div class="card">
        <img src="" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">Name</h5>
          <p class="card-text">Status</p>
          <button class="btn btn-secondary disabled">details +</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card .card-img-top {
  width: 18em;
}

.card-title .card-text {
  min-width: 12em;
  height: 16px;
}

.card .card-img-top,
.card-title .card-text {
  background-color: rgb(133, 124, 124);
}
</style>
