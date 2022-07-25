<template>
  <div>
    <p class="title">推荐歌单</p>
    <div>
      <van-row gutter="10">
        <van-col span="8" v-for="item in recommendList" :key="item.id">
          <van-image width="117" height="100" :src="item.picUrl" />
          <p class="song_name">{{ item.name }}</p>
        </van-col>
      </van-row>
    </div>
    <p class="title">推荐歌单</p>
    <div>
      <!-- <van-cell
        center
        :title="item.name"
        :label="item.song.artists[0].name + ' - ' + item.name"
        v-for="item in newMusic"
        :key="item.id"
      >
        <template #right-icon>
          <van-icon name="play-circle-o" size="0.6rem" />
        </template>
      </van-cell> -->
      <SongItem
        v-for="item in newMusic"
        :key="item.id"
        :id="item.id"
        :label="item.song.artists[0].name + ' - ' + item.name"
        :name="item.name"
      />
    </div>
  </div>
</template>

<script>
import SongItem from "@/components/SongItem.vue";
import { recommendMusicApi, newMusicApi } from "@/api";
export default {
  name: "HomePage",
  components: { SongItem },
  data() {
    return {
      recommendList: [],
      newMusic: [],
    };
  },
  methods: {
    async getRecommendMusci() {
      try {
        const res = await recommendMusicApi({ limit: 6 });
        this.recommendList = res.data.result;
      } catch (e) {
        console.log(e);
      }
    },
    async getNewMusic() {
      try {
        const res = await newMusicApi({ limit: 20 });
        console.log(res);
        this.newMusic = res.data.result;
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.getRecommendMusci();
    this.getNewMusic();
  },
};
</script>

<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>
