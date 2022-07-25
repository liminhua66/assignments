<template>
  <div>
    <van-search
      shape="round"
      placeholder="请输入搜索关键词"
      v-model="title"
      @input="inputFn"
    />
    <!-- 搜索下容器 -->
    <div class="search_wrap" v-if="list.length === 0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 每个搜索关键词 -->
        <span
          class="hot_item"
          v-for="(item, index) in hotArr"
          :key="index"
          @click="clickFn(item.first)"
          >{{ item.first }}</span
        >
      </div>
    </div>

    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <!-- 歌曲搜索结果容器 -->
      <div class="hot_name_wrap">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <SongItem
            v-for="item in list"
            :key="item.id"
            :id="item.id"
            :label="item.ar[0].name + ' - ' + item.name"
            :name="item.name"
          />
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import SongItem from "@/components/SongItem.vue";
import { hotSearchApi, searchResultApi } from "@/api";
export default {
  data() {
    return {
      title: "",
      hotArr: [],
      list: [],
      loading: false,
      finished: false,
      limit: 20,
      page: 1,
      timer: null,
    };
  },
  components: { SongItem },
  methods: {
    async getHotSearch() {
      try {
        const res = await hotSearchApi();
        this.hotArr = res.data.result.hots;
      } catch (e) {
        console.log(e);
      }
    },
    async getSearchResult() {
      try {
        const res = await searchResultApi({
          keywords: this.title,
          limit: this.limit,
        });
        this.list = (res.data.result && res.data.result.songs) || [];
      } catch (e) {
        console.log(e);
      }
    },
    inputFn() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.getSearchResult();
      }, 1000);
    },
    clickFn(val) {
      this.title = val;
      this.getSearchResult();
    },
    async onLoad() {
      this.page++;
      const res = await searchResultApi({
        keywords: this.title,
        limit: this.limit,
        offset: this.limit * (this.page - 1),
      });
      if (!res.data.result.songs) {
        this.finished = true;
        this.loading = false;
        return;
      }
      this.list = [...this.list, ...res.data.result.songs];
      console.log(this.list);
      this.loading = true;
    },
  },
  mounted() {
    this.getHotSearch();
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>
