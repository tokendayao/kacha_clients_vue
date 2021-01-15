<template>

<!--    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#replyModel" data-whatever="@mdo">Open modal for @mdo</button>-->

    <div class="modal fade" id="replyModel" tabindex="-1" role="dialog" aria-labelledby="replyCommentlLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="replyCommentlLabel">回信儿</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">圈儿起来:</label>
                <input type="text" class="form-control" id="recipient-name" :value="to_user_name">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">这儿说:</label>
                <textarea class="form-control" id="message-text" placeholder="昂...." v-model="replyMsg"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeBtn2">算了</button>
            <button type="button" class="btn btn-primary" @click.prevent="emitToReply">咻~</button>
          </div>
        </div>
      </div>
    </div>




</template>

<script>
    import $ from "jquery";

    export default {
        name: "replyComment",
       props:[
         'to_user_id',
         'punch_id',
         'parent_id',
         'to_user_name'
    ],
      data(){
       return {
         "replyMsg":""
       }
      },
    // {
    //   'to_user_id':"1",
    //   'punch_id':"2",
    //   'parent_id':"3",
    //   'to_user_name':"5",'replyMsg':"5"
    // }
    methods:{
        emitToReply(){
          this.$emit('child-reply-event',this.replyMsg)
        },
        close(){
          $('#closeBtn2').click();
        }
      }
    }
</script>

<style scoped>

</style>
