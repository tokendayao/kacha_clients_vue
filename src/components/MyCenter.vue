<template>
  <div id="SearchPage" class="min-vh-100">
    <CommonHeader></CommonHeader>

    <button id="login" type="submit" class="btn btn-primary float-left" @click.prevent="logout($event)">Logout</button>

  </div>
</template>

<script>
  import CommonHeader from "@/components/CommonHeader";
  import axios from "axios";
  import {mapMutations} from 'vuex';

  export default {
        name: "MyCenter",
      components: {CommonHeader},
      data(){
        return {};
        },
      methods: {
        ...mapMutations([
                         'SET_LOGIN',
                     ]),

          logout(){
            axios
              .post('api/logout')
              .then((response) => {
                console.log(response.data.code);
                if (response.data.code == "200") {

                  this.SET_LOGIN("");
             //    this.SET_LOGIN="";
                  this.$router.push('/login');

                }


              })
              .catch(function (error) {
                console.log(error);
              });
          }
      }
    }
</script>

<style scoped>

</style>
