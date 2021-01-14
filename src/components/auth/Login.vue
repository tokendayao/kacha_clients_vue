<template>
  <div id="LoginPage" class="page bg min-vh-100">
    <CommonHeader></CommonHeader>

    <div id="login_part" class="h-100 container " style="position: absolute;top:40%;min-height: 100vh;">
      <div class="row ">
        <div class="col-lg-6"  style="color: #2c3e50; background-color:#ffccdd;">
          <div class="info d-flex align-items-center">
          <div class="content w-100" >
            <h1>Welcome</h1>
            <p> Kacha Kacha</p>
          </div>
          </div>
        </div>
        <div class="col-lg-6 bg-white ">
          <div class="info d-flex align-items-center ">
            <form class="bs-example bs-example-form" role="form">
              <br>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Username" v-model="username" />

              </div>
              <div class="input-group">
                <input type="password" class="form-control" placeholder="Password" v-model="password"/>

              </div>
             <br>

              <div class="input-group">
                <button id="login" type="submit" class="btn btn-primary float-left" @click.prevent="login($event)">Sign in</button>

              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import $ from 'jquery'
  import axios from "axios";
  import store from '../../store';
  import {mapGetters,mapActions} from 'vuex';

  import CommonHeader from "@/components/CommonHeader";

    export default {
        name: "Login",
        components: {CommonHeader},
        data(){
          return{
            'username':"",
            "password":""

          }
        },


      beforeCreate() {
          console.log(store.state.accessToken);
        // if(store.state.accessToken){
        //   this.$router.push('/my');
        //
        // }else{
        //   this.$router.push('/login');
        //
        // }
      },
      methods:{
        ...mapActions({
          loginAction: 'index/loginAction'
        }),


        async  login(event){

         await this.$store.dispatch('loginAction', {"username":this.username.trim(),"password":this.password.trim()});
        }
      }
    }
</script>

<style scoped="">
  .bg {

    text-align: center;

    position: relative;
    /*可以加上下面注释代码，可以让边缘不那么唐突*/
    /* background: url('timg.jpg') no-repeat;
    background-size:cover; */
    /*也可以加入背景透明，使页面不那么唐突*/
    background-color: rgba(0,0,0,.5);
  }
  .bg::before {
    content: '';
    background: url('../../assets/back.jpeg') no-repeat;
    background-size: cover;
    filter: blur(5px);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
</style>
