<template>
  <div id="IndexPage">

      <div class="container" style="margin-top: 5px" >
        <div class="col-xl-12 text-left  "  style="padding-left:0;" >
        <span class="badge badge-warning">Warning</span>
      </div>
    </div>

    <!--  搜索框 BANNER START   -->

    <div class="container"  style="margin-top: 10px">

      <div class="row">
        <div class="col-xl-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text"><img src="../assets/icons/search.svg" alt="" width="24" height="24" title="Bootstrap" /></span>
            </div>
            <input type="search" class="form-control" placeholder="搜索圈儿" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="../assets/index_s1.jpg" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="../assets/index_s2.jpg" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="../assets/index_s3.jpg" class="d-block w-100" alt="...">
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!--  搜索框 BANNER END   -->

<!--  圈子列表 START  -->

    <div class="container" style="position:absolute; height:540px; overflow:auto;margin-top:10px;">
      <div class="row" style="flex-wrap: nowrap;margin-top: 15px; " data-spy="scroll">
        <div class="col-xl-6" style="background-color:lavender;">
          <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
            <div class="card-header">
              Header
            </div>
            <div class="card-body">
              <h5 class="card-title">Info card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
        <div class="col-xl-6" style="background-color:lavenderblush;">
          <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
            <div class="card-header">
              Header
            </div>
            <div class="card-body">
              <h5 class="card-title">Info card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="flex-wrap: nowrap;margin-top: 15px;" data-spy="scroll">
        <div class="ccol-sm-6 col-md-6" style="background-color:lavenderblush;">
          <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
            <div class="card-header">
              Header
            </div>
            <div class="card-body">
              <h5 class="card-title">Info card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-6" style="background-color:lavender;">
          <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
            <div class="card-header">
              Header
            </div>
            <div class="card-body">
              <h5 class="card-title">Info card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!--  圈子列表 END  -->

<!--  底部   start-->
    <div id="bottom_div" class="container" style="border-top: 1px gray solid ; background-color: white; z-index:1;position:fixed;bottom:0;margin-bottom: 0;">
      <div class="row w-100 " style=" background-color: white; z-index:1;position:fixed;bottom:0;margin-bottom: 0;">
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
    export default {
        name: "IndexPage"
    }
</script>

<style scoped>
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
