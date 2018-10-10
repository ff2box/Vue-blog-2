<template>
    <div>
        <!--<a class=""><i class="iconfont ic-comment"></i>-->
        <!--<span>回复</span>-->
        <!--</a>-->
        <router-link style="margin-left: 15px" to="" target="_blank" class="iconfont ic-comment" data-toggle="modal"
                     data-target="#ReplyToModal">
            <i class="iconfont ic-comment glyphicon glyphicon-comment"></i>
            <span>回复&nbsp;&nbsp;&nbsp;</span>
        </router-link>

        <div class="modal fade modalIndex" id="ReplyToModal" tabindex="-1" role="dialog"
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

<script>
    export default {
        name: "reply-to-modal",
        props: ['nameVal'],
        data() {
            return {
                newSubComment: '',
            }
        },
        mounted() {
        },
        methods: {
            handleCancelSubComment() {
            },
            handleSubComment() {
                if (this.newSubComment === null || this.newSubComment.trim() === "") {
                    return;
                }
                this.$emit("onNewToSubComment", this.newSubComment);
                $("#ReplyToModal").modal("hide");
                this.newSubComment = '';
            },
            // handleSubCommentResult(res) {
            //     if (res === "ok") {
            //         $("#exampleModal").modal("hide");
            //     } else {
            //         //更新失败
            //         this.result = res;
            //     }
            // },
        },
    }
</script>

<style scoped>

</style>