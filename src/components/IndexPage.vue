<template>
  <div id="IndexPage">
    <div id="header_div" class="container" style="margin-top: 5px">
      <div class="col-xl-12 text-left  " style="padding-left:0;">
        <span class="badge badge-warning">Kacha</span>
      </div>
    </div>
    <!--  搜索框 BANNER START   -->
    <div id="search_div" class="container h-100" style="margin-top: 10px">
      <div class="row">
        <div class="col-xl-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text img-fluid"><img src="../assets/icons/search.svg" alt="" title="Bootstrap" @click.prevent="searchGroups($event)" /></span>
            </div>
            <input type="search" class="form-control" placeholder="搜索圈儿" v-model="keyword" @keyup.enter.prevent="searchGroups($event)" />
          </div>
        </div>
      </div>
      <div id="search_banner" class="row h-100 " v-if="bannerList">
        <div class="col-xl-12">
          <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner ">
              <div v-for="(value,key)  in bannerList" :class=" [bannerActive==key?'active':'','carousel-item']">
                <img :src="['../static/'+value.image_src]" class="  w-100 img-responsive center-block" alt="..." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  搜索框 BANNER END   -->
    <!--  圈子列表 START  && (k<groupCount+1) @scroll="handleScroll($event)"-->
    <div id="group_list" class="container" v-if="groupCount" :style="{'position':'relative','overflow':'auto','margin-top':'10px','height':curHeight+'px'}">
      <div v-if="(n%2)!=0" class="row" v-for="n in  groupCount " style="position:relative;flex-wrap: nowrap;margin-top: 15px; " data-spy="scroll">
        <div class="col-xl-6  text-center" v-if="(n%2)!=0 &amp;&amp; (k&gt;=n)  " v-for="k in n+1" :style="style_lavender[Math.floor(Math.random()*6 + 1)]">
          <div v-if="k&lt;(groupCount+1)" class="m-auto card text-white bg-info mb-3" style="max-width: 18rem;">
            <div class="card-header">
              {{ groupList[k-1].group_name }}
            </div>
            <div class="card-body">
              <h5 class="card-title"> {{ groupList[k-1].group_slogan }}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          <div v-else="k&gt;=(groupCount+1)" class="" style="max-width: 18rem;">
          </div>
        </div>
      </div>
    </div>
    <!--  圈子列表 END  -->
    <!--  底部   start-->
    <div class="container" style="border-top: 1px gray solid ; background-color: white; z-index:1;position:fixed;bottom:0;margin-bottom: 0;">
      <div id="bottom_div" class="row w-100 " style=" background-color: white; z-index:1;position:fixed;bottom:0;margin-bottom: 0;">
        <nav class="w-100  " style="">
          <ul id="group_list_ul" class="w-100 list-group list-group-horizontal-sm text-center" style="flex-direction: row;margin-left: 10px;padding-top: 0">
            <li class="list-group-item " style="width:33%"><a class="nav-link" href="#">圈儿</a></li>
            <li class="list-group-item  " style="width:33%"><a class="nav-link" href="#">信儿 <span class="badge badge-light">4</span></a></li>
            <li class="list-group-item  " style="width:33%"><a class="nav-link " href="#">我的</a></li>
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
        lastTime:null,
        pageFinish:0,
        directFlag:0,
        keyword:'',
        bannerList: [],
        bannerActive:0,
        groupList:[],
        groupCount:0,
        groupTotal:0,
        randStyleSeed:0,
        curHeight:0,
        scrollPage:1,
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
        .then((response) => {
          if (response.data.code == "200") {
            // this.bannerList.push(response.data.data.list),
            this.bannerList = response.data.data.list
          }

        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });

      this.indexGroups();
      // window.addEventListener("scroll", this.handleScroll,true);
      window.addEventListener("scroll",this.throttle(this.handleScroll,3000),true)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll,true)
    },
    beforeUpdate(){



    },
    updated(){
      var h = document.documentElement.clientHeight || document.body.clientHeight;

      this.curHeight =h -$('#header_div').height()-$('#search_div').height()-$('#bottom_div').height()-30; //减去页面上固定高度height
    
    },
    methods: {
      throttle(func, wait) {

        let timeout
        return () => {
          let context = this;
          let now = new Date();
          let arg = arguments;


          if (now - this.lastTime - wait > 0) {

            if (timeout) {
              clearTimeout(timeout)
              timeout = null
            }

            func.apply(context, arg)
            this.lastTime = now
          } else if (!timeout) {
            timeout = setTimeout(() => {
              func.apply(context, arg)
            }, wait)
          }
        }
      },

      getDirection() {
        // 页面滚动距顶部距离
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
          document.body.scrollTop || $('#group_list').scrollTop()
        var scroll = scrollTop - this.directFlag;
        this.directFlag = scrollTop;

        if(scroll<0){
          return 'up'
        }else{
          return 'down'

        }
      },

      indexGroups(){

        //取圈子列表,todo带TOKEN
        axios
          .get('api/myGroups?page='+this.scrollPage)
          .then((response) => {
            if (response.data.code == "200") {


              this.groupCount =  response.data.data.list.length+this.groupList.length;


              this.groupTotal=response.data.data.pagination.total

              for(var i=0;i<response.data.data.list.length;i++){

                this.groupList.push(response.data.data.list[i]);

              }



            }else if(response.data.code == "3000"){
              this.pageFinish=1;
              this.scrollPage--;
              console.log('没有更多数据了');
            }


          })
          .catch(function (error) {
            console.log(error);
          });


      },
      searchGroups(event){

        axios
          .get('api/groups?keyword='+this.keyword+'&page='+this.scrollPage)
          .then((response) => {

            if (response.data.code == "200") {
              this.groupList = response.data.data.list,
                this.groupCount = response.data.data.pagination.total
            }


          })
          .catch(function (error) {
            console.log(error);
          });
      },

      handleScroll(event){
        //窗口滚要做的操作写这里
        let sh = document.documentElement.scrollHeight || document.body.scrollHeight; // 滚动条高度
        let st = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条距离顶部的距离
        let ch = document.documentElement.clientHeight || document.body.clientHeight; // 滚动条外容器的高度

        if (st + ch >= sh-20) {

          //快到底时----加载
          if(this.scrollPage <this.groupTotal){


            if(this.getDirection()=='down'){


              if(this.pageFinish!=1){
                if(this.keyword==''){

                  this.scrollPage+=1;


                  this.indexGroups();
                }else{
                  this.searchGroups(event);

                }
              }

            }

          }
        }

      }
    }
  }
</script>
<style scoped="">


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
