<template>
    <div class="row">
        <div class="col-md-4 col-sm-12">
            <div  class="card" style="width: 18rem;">
                <h3 class="card-title">Skeleton</h3>
                <img src="" class="card-img-top" alt="">
            </div>  
        </div>   
        <div class="col-md-4 col-sm-12 row colInfo">   
            <h5 class="col-12 card-title">Biographical information</h5>

            <p class="col-6 card-text labelInfo">status  : </p>
            <p class="col-6 card-text">  </p>

            <p class="col-6 card-text labelInfo"><i class="bi-person"></i> species : </p>
            <p class="col-6 card-text">  </p>

            <p class="col-6 card-text labelInfo">type    : </p>
            <p class="col-6 card-text">  </p>

            <p class="col-6 card-text labelInfo"><i class="bi-gender-trans"></i> gender  : </p>
            <p class="col-6 card-text">  </p>

            <p class="col-6 card-text labelInfo"><i class="bi-globe"></i> location  : </p>
            <p class="col-6 card-text">  </p>

            <p class="col-6 card-text labelInfo"><i class="bi-globe"></i> origin  : </p>
            <p class="col-6 card-text">  </p>
        </div>
        <div class="col-md-4 col-sm-12 row colInfo"> 
            <h5 class="col-12 card-title">Meta information</h5>

            <p class="col-6 card-text labelInfo"><i class="bi-film"></i> episodes: </p>
            <p class="col-6 card-text"> </p>

            <p class="col-12 btn-light"> See all characters that share the episode </p>
            <p class="col-6 card-text labelInfo"><i class="bi-watch"></i> created :</p>
            <p class="col-6 card-text"> </p>
        </div>
    </div>  
</template>
<style scoped>
.card-img-top {
    height: 200px;
    width: 200px;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  border-radius: 4px;
  padding: 5px;
}
.card-title {
    text-align: center;
}

.card {
    background: var(--theme-page-background-color-secondary);
    border: 1px solid rgb(133, 124, 124);
    border-collapse: collapse;
    box-shadow: 0 0 5px rgb(133, 124, 124);
    margin: 0 5px 10px 20px;
}

.labelInfo {
    text-align: right;
}
.colInfo {
    background-color: rgb(199, 187, 187);;
}
</style>