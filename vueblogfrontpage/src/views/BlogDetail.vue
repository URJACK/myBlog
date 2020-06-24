<template>
  <div>
    <Header></Header>
    <div class="mblog">
      <h2>{{blog.title}}</h2>
      <el-link icon="el-icon-edit" v-if="ownBlog">
        <router-link :to="{name:'BlogEdit',params:{blogId:blog.id}}">编辑</router-link>
      </el-link>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import "github-markdown-css";
export default {
  name: "BlogDetail.vue",
  components: { Header },
  data() {
    return {
      blog: {
        id: "",
        userId:"",
        title: "",
        description: "",
        content: ""
      },
      ownBlog: false
    };
  },
  created() {
    const blogId = this.$route.params.blogId;
    const _this = this;
    _this.$axios.get("/blog/" + blogId).then(res => {
      const blog = res.data.data;
      _this.blog.id = blog.id;
      _this.blog.title = blog.title;
      _this.blog.description = blog.description;
      _this.blog.userId = blog.userId;

      let MarkdownIt = require("markdown-it");
      let md = new MarkdownIt();
      let renderContent = md.render(blog.content);
      _this.blog.content = renderContent;
      console.log(_this.blog)
      console.log(_this.$store.getters.getUser)
      if (_this.blog.userId == _this.$store.getters.getUser.id) {
        _this.ownBlog = true;
      }
    });
  }
};
</script>

<style scoped>
.mblog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 600px;
  padding: 20px 15px;
}
</style>