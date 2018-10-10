<template>
    <div style="margin-bottom: 35px">
        <div v-for="comment, index in comments" :key="comment._id">
            <div style="margin-top: 15px" class="author">
                <div class="v-tooltip-container" style="z-index: 0;">
                    <div class="v-tooltip-content">
                        <router-link to="" target="_blank" class="avatar">
                            <!--<img :src="getImage(comment._id)">-->
                            <img style="margin-left: 5px"
                                 :src="'/static/user_' + (parseInt(comment._id)+index) % 4 +'.png'">
                        </router-link>
                        <!--<a class="follow" state="0">-->
                            <!--<i class="glyphicon glyphicon-plus iconfont ic-follow"></i>关注-->
                        <!--</a>-->
                    </div> <!----></div>
                <div class="info">
                    <a href="#" target="_blank" class="name">{{comment.sendId.username}}</a>
                    <div class="meta">
                        <span>{{comment.index}}楼 · {{comment.date}}</span>
                    </div>
                </div>
            </div>
            <div class="comment-wrap"><p>{{comment.commentBody}}</p>
                <div class="tool-group">
                    <a style="float: left" data-v-cdecbe24="" id="like-button-29048672"
                       class="like-button glyphicon glyphicon-thumbs-up">
                        <span style="margin-left: 5px" data-v-cdecbe24="">{{comment.approvalCount}}赞</span>
                    </a>
                    <!--<a @click="handleReSubComment(comment)" class=""><i class="iconfont ic-comment"></i>-->
                    <!--<span>回复</span>-->
                    <!--</a>-->
                    <!--回复按钮Modal-->

                    <!--v-if="comment.sendId._id !== userId"-->
                    <!--:sendId="comment.sendId._id"-->
                    <!--:commentId="comment._id"-->
                    <reply-modal @click.native="onReplyModalShow(comment._id, comment.sendId._id)"
                                 @onNewSubComment="commitSubComment" ref="replyModal"
                                 :nameVal="comment.sendId.username"
                                 style="float: left"></reply-modal>
                    <!--<modal-box :visible.sync="CreateVisible" :options="CreateOptions" @Confirm="ConfirmCreateHandler()">-->
                    <!--Vue-->
                    <!--</modal-box>-->
                    <a class="report">
                        <span style="display: none">举报</span>
                    </a>
                    <div class="clearfix"></div>
                </div>
            </div>

            <!--子评论-->
            <div style="margin-top: 7px;margin-bottom: 7px" v-if="comment.subComments.length > 0">
                <!--<div v-bind:style="{display:comment.display}">-->
                <div v-for="sub in comment.subComments" style="margin-left: 50px"
                     class="sub-comment-list">
                    <div style="margin-top: 5px" id="comment-27951747" class="sub-comment">
                        <p style="margin-bottom: 0">
                            <span>
                                <a href="#" target="_blank">{{sub.sendId.username}}</a>
                                <a href="#" class="maleskine-author" target="_blank">
                                    @{{sub.toId.username}}</a>&nbsp;&nbsp;&nbsp;{{sub.subCommentBody}}
                            </span>
                        </p>
                        <div class="sub-tool-group">
                            <span style="float: left">{{sub.date}}</span>
                            <!--<a class=""><i class="iconfont ic-comment"></i>-->
                            <!--<span>&nbsp;&nbsp;回复&nbsp;&nbsp;</span>-->
                            <!--</a>-->

                            <!--@click.native="onReplyModalShow(comment._id, comment.sendId._id)"-->
                            <!--:sendId="comment.sendId._id"-->
                            <!--:commentId="comment._id"-->
                            <!--@onNewSubComment="commitSubComment" ref="replyModal"-->
                            <!--:nameVal="comment.sendId.username"-->
                            <!--v-if="sub.sendId._id !== userId"-->
                            <reply-to-modal
                                    @click.native="onReplyModalShow(comment._id, sub.sendId._id)"
                                    @onNewToSubComment="commitSubComment" ref="replyModal"
                                    :nameVal="sub.sendId.username"
                                    style="float: left"></reply-to-modal>
                            <div class="clearfix"></div>
                            <a style="display: none" class="report"><span>举报</span></a>
                        </div>
                    </div>
                </div>
            </div>
            <hr style="background-color: hsla(0, 0%, 41%, .2);">
        </div>
    </div>
</template>

<script>
    import ReplyModal from './ReplyModal';
    import ReplyToModal from './ReplyToModal';
    import axios from 'axios';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "comment-item",
        // props:['userId'],
        components: {
            ReplyModal,
            ReplyToModal,
        },
        data() {
            return {
                comments: [],
                contentId: '',
                // subCommentInput: '',
                // subCommentIn: 'collapse',
                updateSubCommentSuccess: "updateSubComment",
                // display:'none',
                currentCommentId: [],
                currentToId: [],
            }
        },
        methods: {
            ...mapGetters(['getToken']),
            getComments(comments, contentId) {
                this.comments = comments;
                this.contentId = contentId;
                comments.forEach(comment => {
                    if (comment.subComments.length > 0) {
                        comments.display = "inline"
                    } else {
                        comments.display = "none"
                    }
                });
            },
            /**
             * 参见：
             * https://www.cnblogs.com/WhiteHorseIsNotHorse/p/7886216.html
             * <img :src="'/static/user_' + parseInt(comment._id) % 4 +'.png'">
             *
             * @param id
             * @returns {string}
             */
            // getImage(id) {  //下面这样写，引用不到
            // const src = `@/images/user_${parseInt(id) % 4 + 1}.png`;
            // return src;
            // },
            cancelSubComment() {
                // this.subCommentInput = "";
            },
            commitSubComment(msg) {

                axios.defaults.headers.common['token'] = this.getToken();
                axios.put('/content/' + this.contentId, {
                    subComment: {
                        toId: this.currentToId[0],
                        // subCommentBody: this.subCommentInput
                        subCommentBody: msg
                    },
                    commentId: this.currentCommentId[0]
                }).then(res => {
                    this.currentCommentId = [];
                    this.currentToId = [];
                    if (res.status === 200) {
                    }
                    switch (res.data.code) {
                        case 0:
                            console.log(this.$refs.name);
                            this.$emit("onUpdateSubComment", this.updateSubCommentSuccess);
                            // this.$refs.replyModal.handleSubCommentResult("ok");
                            break;
                        case -1:
                            alert(res.data.msg);
                            // this.$refs.replyModal.handleSubCommentResult(res.data.msg);
                            break;
                        case 1000:  //token缺失
                        case 1001:  //token不合法
                        case 1002:  //token过期
                            alert(`${res.data.msg}，\r\n请登录！`);
                            this.$router.push('/login?sign=1');
                            break;
                        default:
                            alert(res.status);
                            break;
                    }
                });
            },
            onReplyModalShow(commentId, sendId) {
                if ((this.currentCommentId[0] === undefined) || (this.currentCommentId[1] !== commentId)) {
                    this.currentCommentId[0] = this.currentCommentId[1];
                    this.currentCommentId[1] = commentId;
                    this.currentToId[0] = this.currentToId[1];
                    this.currentToId[1] = sendId;
                }
                // console.log(this.currentCommentId);
                console.log(this.currentToId);
            },
            // onReplyToModalShow() {
            //     if (this.currentCommentId[1] !== commentId) {
            //         this.currentCommentId[0] = this.currentCommentId[1];
            //         this.currentCommentId[1] = commentId;
            //         this.currentToId[0] = this.currentToId[1];
            //         this.currentToId[1] = sendId;
            //     }
            //     console.log(this.currentCommentId);
            // },
        },
        mounted() {
            console.log(this.userId);
        },
        watch: {
            comments(newVal, oldVal) {
                // console.log("comments changed!");
            }
        }
    }
</script>

<style scoped>

</style>