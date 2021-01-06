<template>
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
</template>

<script>
    export default {
        name: "CommonBottom"
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
