<template>
    <div>
        <!--<a class=""><i class="iconfont ic-comment"></i>-->
        <!--<span>回复</span>-->
        <!--</a>-->
        <router-link style="margin-left: 15px" to="" target="_blank" class="iconfont ic-comment" data-toggle="modal"
                     data-target="#exampleModal">
            <i class="iconfont ic-comment glyphicon glyphicon-comment"></i>
            <span>回复&nbsp;&nbsp;&nbsp;</span>
        </router-link>

        <div class="modal fade modalIndex" id="exampleModal" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="exampleModalLabel">@{{nameVal}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <textarea v-model="newSubComment" class="form-control" id="message-text"
                                      :rows="4"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <!--<p>{{result}}</p>-->
                        <button @click="handleCancelSubComment" type="button" class="btn btn-default"
                                data-dismiss="modal">取消
                        </button>
                        <button @click="handleSubComment" type="button" class="btn btn-primary">发送</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<!--这个组件是根据Id来绑定的，所有暂且可以分开写-->
<script>
    export default {
        name: "reply-modal",
        props: ['nameVal'],
        // props: ['nameVal', 'sendId', 'commentId'],
        data() {
            return {
                newSubComment: '',
                // result: '',
            }
        },
        mounted() {
            // console.log(this.sendId, this.commentId);
        },
        methods: {
            handleCancelSubComment() {
                // this.result = '';
            },
            handleSubComment() {
                // console.log(this.sendId, this.commentId);
                if (this.newSubComment === null || this.newSubComment.trim() === "") {
                    return;
                }
                this.$emit("onNewSubComment", this.newSubComment);
                $("#exampleModal").modal("hide");
                // this.result = '';
                this.newSubComment = '';
            },
            handleSubCommentResult(res) {
                if (res === "ok") {
                    $("#exampleModal").modal("hide");
                } else {
                    //更新失败
                    this.result = res;
                }
            },
        },
    }
</script>

<style scoped>

</style>