<template>
  <div id="IndexPage">
    <CommonHeader></CommonHeader>

    <!--  搜索框 BANNER START   -->
    <div id="search_div" class="container h-100" style="margin-top: 10px">
      <div class="row">
        <div class="col-xl-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text img-fluid"><img src="../assets/icons/search.svg" alt="" title="Bootstrap" @click.prevent="searchGroups($event)" /></span>
            </div>
            <input type="search" class="form-control" placeholder="搜索圈儿" v-model="keyword" @click.prevent="searchGroups($event)" />
          </div>
        </div>
      </div>


      <div id="search_banner" class="row h-100 " >
        <div class="col-xl-12">
          <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner " ref="aaa">

               <div v-for="(value,key)  in bannerList" :class=" [bannerActive==key?'active':'','carousel-item']" >
                <img :id="['image_'+key]" :src="['../static/'+value.image_src]" class="h-100  w-100 img-fluid center-block" alt="..." />

              </div>


            </div>
          </div>
        </div>
      </div>

    </div>
    <!--  搜索框 BANNER END   -->
    <!--  圈子列表 START  -->
    <div id="group_list" class="container " v-if="groupCount"   :style="{'position':'relative','overflow':'auto','margin-top':'10px','height':curHeight+'px'}">
      <div v-if="(n%2)!=0" class="row" v-for="n in  groupCount " style="position:relative;flex-wrap: nowrap;margin-top: 10px; " >
        <div class="col-xl-6  text-center" v-if="(n%2)!=0 &amp;&amp; (k&gt;=n)  " v-for="k in n+1" >
          <div v-if="k&lt;(groupCount+1)" class="m-auto card text-white  mb-3" :style="{'max-width': '18rem','background-color':style_card[Math.floor(Math.random()*8 + 1)]}">

            <div class="card-header w-100 ">

              {{ groupList[k-1].group_name }}
              <div v-if="groupList[k-1].is_new_group "  style="z-index: 1;position: absolute;right:0;top:0" >

                <img class="img-fluid" style="width: 36px;height:36px" src="../assets/icons/new.png"/>

              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title"> {{ groupList[k-1].group_slogan }}</h5>
              <p class="card-text" >

                  <a :href="'/groupDetail?gid='+groupList[k-1].group_id" >
                <img :src="['../static/uploads/'+groupList[k-1].group_logo_src]" class="w-100 img-fluid img-thumbnail" />
                </a>
              </p>

            </div>
          </div>
          <div v-else="k&gt;=(groupCount+1)" class="" style="max-width: 18rem;">
          </div>
        </div>
      </div>
    </div>
    <!--  圈子列表 END  -->

    <div class="container" style="border-top: 1px gray solid ;  z-index:1;position:fixed;bottom:0;margin-bottom: 0;">
      <!-- 信息提示 START-->
      <div class="msg" id='msg'>
      </div>
      <!-- 信息提示 END-->

    </div>

    <!--  新建圈子   start-->

    <div style=" max-width:50px;max-height:50px;border-radius:5px;z-index:1;position:fixed;bottom:50px;margin-bottom: 50px;right:10px">
    <a  href="/createGroup"  role="button" aria-pressed="true" >
      <img src="../assets/icons/add.png" class="img-fluid w-100 h-100" >

    </a>
    </div>
    <!--  新建圈子   end-->


    <!--  底部   start-->
    <div class="container" style="border-top: 1px gray solid ;  z-index:1;position:fixed;bottom:0;margin-bottom: 0;">
      <common-bottom></common-bottom>

    </div>
    <!--  底部  end -->
  </div>
</template>
<script>
  import $ from 'jquery'
  import axios from "axios";
  import CommonHeader from "@/components/CommonHeader";
  import CommonBottom from "@/components/CommonBottom";

  export default {
    name: "IndexPage",
    components: {CommonHeader,CommonBottom},
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
        style_card:['#ffb3d9','#0077b3','#40bf80','#c68c53','#ff3377','#33ffcc','#99ddff','#003366','#8c8c8c'],

      }
    },
    watch: {
      bannerList:function(){

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


             this.bannerList = response.data.data.list

          }



        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });

      this.indexGroups();
      // window.addEventListener("scroll", this.handleScroll,true);
      window.addEventListener("scroll",this.throttle(this.handleScroll,2000),true)
    },
    beforeDestroy() {

      window.removeEventListener('scroll', this.handleScroll,true)
    },
    beforeUpdate(){
      console.log("beforeUpdate");

    },
    updated(){
      var h = document.documentElement.clientHeight || document.body.clientHeight;

      this.curHeight =h*0.7+15 ;
    },
    methods: {

      //根据dom删除元素
       removeHtml(dom) {
      setTimeout(function () {
      dom.slideUp(2000, function () {
        dom.remove();
      });
    }, 1 * 1000);//延迟5000
  },


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
              var htmlStr = '<div id="msg_id_1" class="bg-warning text-white" style="background-color:rgba(0,0,0,0);" role="alert"><strong>没有更多数据了</strong></div>'
              $("#msg").append(htmlStr)
              this.removeHtml($("#msg_id_1"))
            }


          })
          .catch(function (error) {
            console.log(error);
          });


      },
      searchGroups(event){


        this.$router.push({path:'/search',query:{}});
      },

      handleScroll(event){
        //窗口滚要做的操作写这里
        let sh = document.documentElement.scrollHeight || document.body.scrollHeight; // 滚动条高度
        let st = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条距离顶部的距离
        let ch = document.documentElement.clientHeight || document.body.clientHeight; // 滚动条外容器的高度

        if (st + ch >= sh-25) {

          //快到底时----加载
          if(this.scrollPage <this.groupTotal){


            if(this.getDirection()=='down'){


              if(this.pageFinish!=1){
                this.scrollPage+=1;
                if(this.keyword==''){

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
  body{
    height:102%;
  }
  .msg {
    z-index:2;
    /*background-color: red;*/
    width:  40%;
    height: 50px;

    /*margin-bottom:0px;*/
    position: absolute;
    /*left: 140px;*/
    /*top: 0;*/
    right: 30%;
    bottom: 50px;
    pointer-events: none;


  }


</style>
