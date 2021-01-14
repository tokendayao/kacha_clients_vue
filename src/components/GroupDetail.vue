<template>
<!--  :style="{'height':curHeight+'px'}"-->

  <div id="group_post_list" >

   <div class="card bg-dark text-white" style="border: 0;">

     <img :src="'../static/uploads/'+groupInfo.group_logo_src" class="card-img" alt="..." style="max-width: 1024px;max-height: 201px">

     <div class="card-img-overlay  align-content-start" style="margin-top: 20px;" >
       <a href="/index" style="z-index: 1;top:0;padding-bottom: 5px"   >

         <img src="../assets/icons/undo.png" class="mr-3" alt="..." style="max-width: 50px;max-height: 50px">

       </a>

       <h4 class="card-title text-dark font-weight-bold">{{ groupInfo.group_name }}</h4>
       <p class="card-text  font-weight-bold text-primary text-wrap" >{{ groupInfo.group_slogan }}</p>


       <p class="badge badge-pill badge-info text-wrap align-content-start "   >
         已有<span class="text-warning">{{ groupInfo.groupers }}</span>位小伙伴儿与你一起参与

         </p>
      <p>
        <a href="#" class="btn btn-warning" v-if="groupInfo.is_user_join==0">进圈儿</a>
      </p>
       <div class="col-lg-12   text-right" style="bottom: 0;position: absolute">
         <a href="#" class="btn btn-secondary " style="right:0" v-if="groupInfo.is_user_join">退圈儿</a>
       </div>


     </div>
   </div>

   <div class="alert alert-info alert-dismissible fade show" role="alert">
     <strong>Hi~小伙伴</strong>     {{ groupInfo.group_introduction }}
     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
       <span aria-hidden="true">&times;</span>
     </button>
   </div>

   <div  id="punchlist" v-if="punchList">

     <div class="media border border-bottom " v-for=" punch  in punchList"  style="padding: 5px 5px 5px 5px" >
       <img src="../assets/a1.png" class="mr-3" alt="..." style="max-width: 50px;max-height: 50px">
       <div class="media-body">

         <div class="col-lg-12 form-inline" style="text-wrap: none" data-toggle="collapse" :data-target="'#collapseOne'+punch.punch_id" aria-expanded="true" aria-controls="collapseOne">

           <abbr title="World Health Organization"> <h6>{{ punch.user_name }} </h6></abbr>
           <span class="badge  ">{{ punch.punch_time }}</span>

         </div>

         <div class="w-100 text-wrap " style="font-size:14px;padding-left: 20px" >
           {{ punch.punch_brief_content }}

         </div>

         <div :id="'collapseOne'+punch.punch_id"  class="collapse show" aria-labelledby="headingOne" data-parent="#group_post_list" >

         <div  class="col-lg-12 " v-for="comment in punch.comments" style="margin-top: 5px">
            <h6 class="mr-3">
             {{ comment.from_username }}
           </h6>


           <div class="w-100 text-wrap " style="font-size:14px;padding-left: 20px"   >

              {{ comment.comment_content }}
           </div>

           <div class="w-100" v-for="reply in comment.replyList">

             <h6 class="mr-3"> {{ reply.from_username }} 回复 {{ reply.from_username }} :</h6>



             <div class="w-100 text-wrap " style="font-size:14px;padding-left: 20px"  >

               {{ reply.comment_content }}
             </div>


           </div>

         </div>

         </div>

       </div>
     </div>


   </div>





 </div>


</template>

<script>
  import $ from 'jquery'
  import axios from "axios";
  import store from '../store';

  import {mapGetters,mapActions} from 'vuex';



  export default {
        name: "GroupDetail",
data(){
          return{
            curHeight:0,
            gid:0,
            groupInfo:{},
            punchList:[]

          }
},
    computed:{
      ...mapGetters(["GET_GROUP_INFO","GET_PUNCH_LIST"])
    },
    mounted() {
     this.gid=this.$route.query.gid;
      this.curHeight= document.documentElement.clientHeight || document.body.clientHeight;
      this.$store.dispatch('getGroupAction', {"groupId":this.gid});

      this.$store.dispatch('getPunchesAction', {"groupId":this.gid});

    },
    watch: {
      GET_GROUP_INFO: {
        handler: function (val, oldVal) {
          this.groupInfo=val;
        },
        deep: true
      },
      GET_PUNCH_LIST: {
        handler: function (val, oldVal) {
          this.punchList=val;
        },
        deep: true
      }

      },
    methods:{
      ...mapActions({
        getGroupAction: 'index/getGroupAction',
        getPunchesAction: 'index/getPunchesAction'

      }),



    }
  }
</script>

<style scoped>

</style>
