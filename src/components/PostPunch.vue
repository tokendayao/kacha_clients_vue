<template>

      <div class="modal fade" id="postModel"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

      <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">叨叨叨...</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>

                <div class="form-group">
                  <label for="message-text" class="col-form-label">这儿说:</label>
                  <textarea class="form-control" id="message-text" placeholder="em......." rows="3" v-model="childPunchMsg"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeBtn">算了</button>
              <button type="button" class="btn btn-primary" @click.prevent="emitToParent">咻儿~</button>
            </div>
          </div>
        </div>
      </div>

</template>

<script>
  import $ from 'jquery'
    export default {
        name: "PostPunch",
      data(){
          return {
            childPunchMsg:""
          }
      },
      methods:{
          emitToParent(){
            this.$emit('child-event',this.childPunchMsg)
          },
        close(){
             $('#closeBtn').click();
        }
      }
    }
</script>

<style scoped>

</style>
