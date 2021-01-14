import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import getters from "./getter";
import router from '../router'
Vue.use(Vuex);

const store =  new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '',
    groupInfo:{},
    puchlist:[]
  },

  mutations: {
    // 修改token，并将token存入localStorage
    SET_LOGIN(state,accessToken){

      // state.accessToken=accessToken;
      localStorage.setItem('accessToken', accessToken);


    },
    SET_GROUP_INFO(state,groupInfo){


      state.groupInfo=groupInfo;


    },
    SET_PUNCH_LIST(state,puches){


      state.puchlist=puches;


    },

  },

  actions:{
    async  loginAction({commit},userRequest){
         return  await  axios.post('/oauth/token',{
        "grant_type":"password",
        "client_id":"2",
        "client_secret" : "BPzqBwzRZT78N1xQVcO72Palfi6JmwxCgMcwD3My",
        "username":userRequest.username,
        "password":userRequest.password,
        "scope":"*"
      }).then((response) => {

        commit('SET_LOGIN','Bearer ' +response.data.access_token);
        router.push('/');


      }).catch(function (error) { // 请求失败处理
         alert("用户名或密码错误");

        });



    },
     createGroupAction({commit},groupRequest){
      return  axios.post('/api/groups',groupRequest).then((response) => {

        if(response.data.code=='200'){
          alert('创建成功');
          router.push('/index');
        }else{
          alert(response.data.msg);
        }


       }).catch(function (error) { // 请求失败处理

         console.log("aa"+error+"cc")

       });

     },
    getGroupAction({commit},params){


      axios
        .get('api/groups/'+params.groupId)
        .then((response) => {


          if (response.data.code == "200") {

            commit('SET_GROUP_INFO',response.data.data.item);


          }



        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });


    },
    getPunchesAction({commit},params){


      axios
        .get('api/punches?group_id='+params.groupId)
        .then((response) => {

         console.log(response);
          if (response.data.code == "200") {

            commit('SET_PUNCH_LIST',response.data.data.list);


          }



        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });


    }
  },
  getters

});

export default store;



