<template>
  <div class="m-content">
    <h3>欢迎来到付枋洲的blog~</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div>{{user.username}}</div>
    </div>

    <div class="maction">
      <el-link type="info" href="#/blogs">主页</el-link>
      <el-divider direction="vertical"></el-divider>
      <el-link type="success" href="#/blog/add">发表文章</el-link>

      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin">
        <el-link type="primary" href="#/login">登录</el-link>
        <el-divider direction="vertical"></el-divider>
      </span>

      <span v-show="hasLogin">
        <el-link type="danger" @click="logout">退出</el-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user: {
        username: "请先登录",
        avatar:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      },
      hasLogin: false
    };
  },
  methods: {
    logout() {
      const _this = this;
      _this.$axios
        .get("/logout", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          _this.$store.commit("REMOVE_INFO");
          _this.$router.push("/login");
        });
    }
  },
  created() {
    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username;
      this.user.avatar = this.$store.getters.getUser.avatar;
      this.hasLogin = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-content {
  margin: 0 auto;
  max-width: 960px;
  text-align: center;
}
.maction {
  margin: 10px 0;
}
</style>
