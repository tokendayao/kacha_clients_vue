<template>

  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">

    <a  href="/index" class="btn btn-secondary btn-sm active " role="button" aria-pressed="true"
        style="position:absolute; right:10%;top:60px;z-index:16;border-radius: 5rem; ">
      <span class="font-weight-bold ">跳过</span>
    </a>
    <div class="carousel-indicators" style="position: fixed">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </div>

    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../assets/s1.jpg" class="d-block w-100 img-responsive center-block" alt="..." >
      </div>
      <div class="carousel-item">
        <img src="../assets/s2.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../assets/s3.jpg" class="d-block w-100" alt="...">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>

    export default {
        name: "StartUpPage"
    }
</script>

<style scoped>

</style>
