<template>
  <div>
    <Header></Header>
    <div class="block">
      <el-timeline>
        <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card>
            <router-link :to="{name:'BlogDetail',params:{blogId:blog.id}}">
              <h4>{{blog.title}}</h4>
            </router-link>
            <p>{{blog.description}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="mpage">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="page"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  name: "Blogs.vue",
  components: { Header },
  data() {
    return {
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 5
    };
  },
  methods: {
    page(currentPage) {
      const _this = this;
      _this.$axios.get("/blogs?currentPage=" + currentPage).then(res => {
        console.log(res);
        //res.data 是我们在后台定义的接口数据
        //其中 res.data.data 是后台使用mybatis plus的IPage接口封装的数据
        //封装数据字段包括 records(实际的数据条) total(总量) size(页大小) current(当前页) pages(总页码) searchCount
        let datas = res.data.data;
        _this.blogs = datas.records;
        _this.total = datas.total;
        _this.pageSize = datas.size;
        _this.currentPage = datas.current;
      });
    }
  },
  created() {
    this.page(1);
  }
};
</script>

<style scoped>
.mpage {
  margin: 0 auto;
  text-align: center;
}
</style>