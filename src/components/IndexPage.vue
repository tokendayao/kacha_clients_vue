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
    <!--  圈子列表 START  :style="{'position':'relative','overflow':'auto','margin-top':'10px','height':curHeight+'px'}"-->
    <div id="group_list" class="container " v-if="groupCount"  style="position: relative;margin-bottom: 25px">
      <div v-if="(n%2)!=0" class="row" v-for="n in  groupCount " style="position:relative;flex-wrap: nowrap;margin-top: 10px; " >
        <div class="col-xl-6  text-center" v-if="(n%2)!=0 &amp;&amp; (k&gt;=n)  " v-for="k in n+1" >
          <div v-if="k&lt;(groupCount+1)" class="m-auto card text-white  mb-3" :style="{'max-width': '18rem','background-color':style_card[Math.floor(Math.random()*8 + 1)]}">
            <div class="card-header">
              {{ groupList[k-1].group_name }}
            </div>
            <div class="card-body">
              <h5 class="card-title"> {{ groupList[k-1].group_slogan }}</h5>
              <p class="card-text" ><img :src="['../static/'+groupList[k-1].group_logo_src]" class="w-100 img-fluid img-thumbnail" /></p>
            </div>
          </div>
          <div v-else="k&gt;=(groupCount+1)" class="" style="max-width: 18rem;">
          </div>
        </div>
      </div>
    </div>
    <!--  圈子列表 END  -->



    <!--  底部   start-->
    <div class="container" style="border-top: 1px gray solid ;  z-index:1;position:fixed;bottom:0;margin-bottom: 0;">
      <!-- 信息提示 START-->
      <div class="msg" id='msg'>
      </div>
      <!-- 信息提示 END-->



      <div id="bottom_div" class="row w-100 " style=" background-color: #F7F7F7; z-index:1;position:fixed;bottom:0;margin-bottom: 0;">

        <nav class="w-100  " style="">
          <ul id="group_list_ul" class="w-100 list-group list-group-horizontal-sm text-center" style="flex-direction: row;margin-left: 10px;padding-top: 0">
            <li class="list-group-item " style="width:33%"><a class="nav-link" href="/index">圈儿</a></li>
            <div id="notice_count" class="badge badge-light notice_count">4</div>

            <li class="list-group-item  " style="width:33%"><a class="nav-link" href="#" data-content="详情详情详情">信儿 </a></li>
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
  .notice_count {
    position:absolute;
    padding-left: 53%;
    z-index: 1;
    background-color:rgba(0,0,0,0);

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
    background-color: #F7F7F7


  }

</style>
