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

      <div  v-for="(value, key) in bannerList" :class='[bannerActive==key ?"active":"","carousel-item"]' >
        <img :src="['../static/'+value.image_src]" class="d-block w-100 img-responsive center-block" alt="..." >
      </div>


    </div>

  </div>
</template>

<script>
  import axios from 'axios'
    export default {
      name: "StartUpPage",
      data(){
         return {
           bannerList: null,
           bannerActive:1
         }
        },
      mounted () {

        axios
          .get('api/banners?type=onboarding')
          .then(response => (
             this.bannerList=response.data.data.list

          ))
          .catch(function (error) { // 请求失败处理
            console.log(error);
          });
      }
    }
</script>

<style scoped>

</style>
