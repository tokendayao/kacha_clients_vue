<template>
  <div id="IndexPage">



      <div id="header_div" class="container" style="margin-top: 5px" >
        <div class="col-xl-12 text-left  "  style="padding-left:0;" >
        <span class="badge badge-warning">Kacha</span>
      </div>
    </div>

    <!--  搜索框 BANNER START   -->

    <div id="search_div" class="container h-100"  style="margin-top: 10px">


      <div  class="row">
        <div class="col-xl-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">

              <span class="input-group-text img-fluid"><img src="../assets/icons/search.svg" alt="" title="Bootstrap" /></span>
            </div>
            <input type="search" class="form-control" placeholder="搜索圈儿"  />
          </div>
        </div>
      </div>





      <div id="search_banner" class="row h-100" >
        <div class="col-xl-12">
          <div id="carouselExampleSlidesOnly"  class="carousel slide" data-ride="carousel">
            <div class="carousel-inner ">
              <div v-for="(value,key)  in bannerList" :class=" [bannerActive==key?'active':'','carousel-item']">
                <img :src="['../static/'+value.image_src]" class="  w-100 h-100 img-responsive center-block" style="position: relative" alt="..." >

              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
    <!--  搜索框 BANNER END   -->

<!--  圈子列表 START  -->
    <div class="container" :style="{'position':'relative','overflow':'auto','margin-top':'10px','height':curHeight+'px'}">



        <div v-if="(n%2)!=0" class="row"v-for="n in  groupCount " style="position:relative;flex-wrap: nowrap;margin-top: 15px; " data-spy="scroll">

          <div class="col-xl-6" v-if="(n%2)!=0 && k>=n " v-for="k in n+1" :style="style_lavender[Math.floor(Math.random()*6 + 1)]" >

            <div  class="card text-white bg-info mb-3" style="max-width: 18rem;">

              <div class="card-header">

                {{ groupList[k-1].group_name }}
              </div>

              <div class="card-body">
                <h5 class="card-title"> {{ groupList[k-1].group_slogan }}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>

            </div>

          </div>

      </div>


    </div>

    <!--  圈子列表 END  -->

<!--  底部   start-->
    <div  class="container" style="border-top: 1px gray solid ; background-color: white; z-index:1;position:fixed;bottom:0;margin-bottom: 0;">
      <div id="bottom_div" class="row w-100 " style=" background-color: white; z-index:1;position:fixed;bottom:0;margin-bottom: 0;">
      <nav class="w-100  " style="">
        <ul  id="group_list_ul" class="w-100 list-group list-group-horizontal-sm text-center" style="flex-direction: row;margin-left: 10px;padding-top: 0">
          <li class="list-group-item " style="width:33%" ><a class="nav-link" href="#">圈儿</a></li>
          <li class="list-group-item  " style="width:33%" ><a class="nav-link" href="#">信儿 <span class="badge badge-light">4</span></a></li>
          <li class="list-group-item  " style="width:33%" ><a class="nav-link " href="#">我的</a></li>
        </ul>
      </nav>
       </div>
    </div>
    <!--  底部  end -->

  </div>

</template>

<script>
  import $ from 'jquery'
    import axios from "axios";

    export default {
        name: "IndexPage",
      data(){
        return {
          bannerList: [],
          bannerActive:0,
          groupList:[],
          groupCount:0,
          randStyleSeed:0,
          curHeight:0,
          style_lavender:[
            {"background-color":"lavender"},
            {"background-color":"lavender"},
            {"background-color":"lavenderblush"},
            {"background-color":"#FFE4B5"},
            {"background-color":"#FFC1C1"},
            {"background-color":"#F0FFF0"},
            {"background-color":"#D1EEEE"},
            {"background-color":"#C1CDC1"},
            {"background-color":"#8968CD"}
          ],

        }
      },
      computed: {

      },
     beforeCreate() {

     },
      created() {

      },
      beforeMount() {

      },
      mounted () {
       //取BANNER
        axios
          .get('api/banners?type=index')
          .then(response => (

              // this.bannerList.push(response.data.data.list),
            this.bannerList=response.data.data.list
      ))
          .catch(function (error) { // 请求失败处理
            console.log(error);
          });

        //取圈子列表
        axios
          .get('api/myGroups')
          .then(response => (
            this.groupList=response.data.data.list,
              this.groupCount=response.data.data.pagination.total

          ))
          .catch(function (error) {
            console.log(error);
          });




      },
  beforeUpdate(){



  },
  updated(){

    var h = document.documentElement.clientHeight || document.body.clientHeight;

    this.curHeight =h -$('#header_div').height()-$('#search_div').height()-$('#bottom_div').height(); //减去页面上固定高度height

    console.log($('#search_div').height());

  },
      // methods: {
      //   getRandomInt(){
      //     // alert(Math.ceil(Math.random()*6)),
      //    this.data.randStyleSeed=Math.ceil(Math.random()*6)
      //     }
      // }
    }
</script>

<style scoped >


  ul{
    width: 100%;
                margin:0;
                padding:0;
    list-style:none;
align-content: center;
    overflow:hidden;
  }
ul li{

                 margin:0;
                padding:0;
          border:none;


             }

</style>
