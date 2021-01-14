<template>
  <div id="CreateGroup" class="min-vh-100 customFont">
    <CommonHeader></CommonHeader>


    <div class="container" style="margin-top: 10px">
      <form class="was-validated" enctype="multipart/form-data">
      <div class="row   text-center ">
        <div class="col-lg-12">
          <input type="file" @change="fileChange($event)" accept="image/*" class="custom-file-input" id="logoFileUpload" hidden >
        <figure class="figure">

          <img id="logoImg" @click="openFileupload($event)" src="../assets/icons/upload.png" style="max-width: 100px;max-height: 100px" class="figure-img img-fluid rounded" alt="...">
         <input type="hidden" id="logosrc" v-model="group_logo_src" />
          <figcaption class="text-success"><h5>上传圈儿LOGO~</h5></figcaption>
        </figure>
        </div>
      </div>

        <div class="row justify-content-start">
          <div class="custom-control custom-radio  col-6">
            <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" checked>
            <label class="custom-control-label" for="customRadioInline1" >免费圈儿</label>
          </div>
          <div class="custom-control custom-radio  float-right col-6">
            <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" disabled>
            <label class="custom-control-label " for="customRadioInline2">付费圈儿</label>
          </div>
        </div>
        <hr/>

        <div class="form-group row "  >
          <label for="groupName"  class="col-3 col-form-label">圈儿名</label>

          <div class="col-9 text-left">
            <input type="text" class="form-control is-invalid" id="groupName" placeholder="输入圈儿名" v-model="group_name"  required></input>
            <div class="invalid-feedback">
              起个名儿呗
            </div>
          </div>



        </div>



        <div class="form-group row" >
          <label for="groupSlogan" class="col-3 col-form-label">Slogan</label>
          <div class="col-9 text-left">
            <input type="text" class="form-control is-invalid"  id="groupSlogan" placeholder="输入一句口号" v-model="group_slogan"  required>
            <div class="invalid-feedback">
             一句响亮的口号
            </div>
          </div>
        </div>
        <hr/>

        <div class="form-group text-left">
          <label for="groupIntro" class="text-left">圈儿介绍</label>
          <textarea class="form-control is-invalid" id="groupIntro" v-model="group_introduction" rows="3" required></textarea>
          <div class="invalid-feedback">
           多多少少说一些
          </div>
        </div>

        <div class="custom-control custom-switch text-left">
          <input type="checkbox" class="custom-control-input" id="groupOpen" checked readonly>
          <label class="custom-control-label" for="groupOpen">公开圈儿</label>
        </div>
        <hr/>
        <div class="alert alert-warning text-left" role="alert" style="margin-top: 10px">

          请认真仔细阅读《Kacha圈儿主协议》，若所见圈儿内涉及时政，色情，暴力，无资质荐股，推币等违法内容传播，Kacha将立即永久封停圈儿和相关账号，请各位用户自觉遵守国家法律和平台规则。
        </div>
        <hr/>
        <div class="custom-control custom-radio  text-left">


          <input type="radio" id="groupProicy" name="customRadioInline3" class="custom-control-input" checked>
          <label class="custom-control-label" for="groupProicy" > 已阅读并同意《圈主协议》</label>


          <button type="submit" class="btn btn-primary  float-right " @click.prevent="submitGroupInfo($event)" >创建</button>
        </div>

      </form>

    </div>


  </div>

</template>

<script>
  import $ from 'jquery'
  import axios from "axios";
  import qs from 'qs'

  import CommonHeader from "@/components/CommonHeader";
  import {mapActions} from 'vuex';
  import router from "../router";

    export default {
        name: "CreateGroup",
        components: {CommonHeader},
      data(){
          return {
             "group_name":"",
            "group_slogan":"",
            "group_introduction":"",
            "group_logo_src":""
          }
      },
      methods:{

        ...mapActions({
          createGroupAction: 'index/createGroupAction'
        }),


        submitGroupInfo(event){

           let res= this.$store.dispatch('createGroupAction',{

           "group_logo_src": $("#logosrc").get(0).value.toString(),
           "group_pay_type":"free",
           "group_name":this.group_name,
           "group_slogan":this.group_slogan,
           "group_introduction":this.group_introduction,
           "group_status":"open",
           "group_user_count":"1"
          });


        },
        openFileupload(event){

          return $("#logoFileUpload").click();
        },
        fileChange(event) {

          let formData = new FormData();

          formData.append('_method','post');
          //获取上传的文件
          let file =event.target.files[0]
          formData.append('file', file);
          formData.append("title","thisAGoodTitle")

          //创建文件读取对象
          var reader = new FileReader();
          //读取file文件
          reader.readAsDataURL(file);
          //读取成功后执行函数
          reader.onload = function(ev) {
            //获取显示图片的元素标签
            var $my = $("#logoImg");
            //ev中target的result的值赋给元素标签src
            $my.get(0).src = ev.target.result;
          };



          $.ajax({

            type: 'POST',
            url: '/api/uploadGroupLogo' ,
            data: formData,
            contentType: false,
            processData: false,
            async:false,
            success:function(data){
              // this.logosrc=data.data.pic;
              $("#logosrc").get(0).value = data.data.pic;
              // this.group_logo_src=data.data.pic;
              console.log(data.data.pic);


            },
            error:function(err){
              console.log(err);
            }

          });


          }
      }

    }
</script>

<style scoped>
body{

}
  .customFont{
    font-weight: bolder;

  }
</style>
