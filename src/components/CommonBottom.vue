<template>
  <div id="bottom_div" class="row w-100 " style=" background-color: #F7F7F7; z-index:1;position:fixed;bottom:0;margin-bottom: 0;">

    <nav class="w-100  " style="">
      <ul id="group_list_ul" class="w-100 list-group list-group-horizontal-sm text-center" style="flex-direction: row;margin-left: 10px;padding-top: 0">
        <li class="list-group-item " style="width:33%"><a class="nav-link" href="/index">圈儿</a></li>


        <li class="list-group-item  " style="width:33%"><a class="nav-link" href="/notice" data-content="详情详情详情">信儿   <span class="badge badge-danger notice_count" >4</span> </a></li>
        <li class="list-group-item  " style="width:33%"><a class="nav-link "  :href=" [get_accessToken?'/my':'/login']">我的</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
        name: "CommonBottom",
      computed:{
        ...mapGetters(["get_accessToken"])
      },
      methods:{
        gotoMy(event){

            if(this.get_accessToken){
              this.$router.push('/my');

            }else{
              this.$router.push('/login');

            }

        }
      }
    }
</script>

<style scoped="">
  .notice_count {
    position:absolute;;
    z-index: 1;


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
