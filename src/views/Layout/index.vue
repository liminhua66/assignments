<template>
  <div>
    <van-nav-bar :title="$route.meta.title" />
    <div class="main">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" router>
      <van-tabbar-item replace to="/layout/home" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/search" icon="search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "LayoutPage",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  /* padding-top: 46px; */
  padding-bottom: 50px;
}
</style>
