<template>
  <div class="main" style="width: 500px">
    <wikitabs :cate="menus" @tabFn="tabFn"></wikitabs>
  </div>
</template>
<script>
import wikitabs from "@/components/wiki-tabs.vue"
export default {
  name: 'index',
  components: {
    wikitabs,
  },
  data() {
    return {
      menus: [
        {
          code: 1,
          name: '首页',
        },
        {
          code: 2,
          name: '生活日用',
        },
        {
          code: 3,
          name: '床上用品',
        },
        {
          code: 4,
          name: '五谷杂粮',
        },
        {
          code: 5,
          name: '洗浴用品',
        },
        {
          code: 6,
          name: '美容护肤',
        },
        {
          code: 7,
          name: '卫浴用品',
        },
        {
          code: 8,
          name: '营养食品',
        },
        {
          code: 9,
          name: '营养食品',
        },
        {
          code: 10,
          name: '营养食品',
        },
        {
          code: 11,
          name: '营养食品',
        },
        {
          code: 12,
          name: '营养食品',
        },
        {
          code: 13,
          name: '营养食品',
        },
        {
          code: 14,
          name: '营养食品1414141414',
        },
        {
          code: 15,
          name: '营养食品151515151515',
        },
        {
          code: 16,
          name: '营养食品161616161616',
        },
        {
          code: 17,
          name: '营养食品1717171717',
        },
        {
          code: 18,
          name: '营养食品181818181818',
        },
        {
          code: 19,
          name: '营养食品19191919',
        },
        {
          code: 20,
          name: '营养食品2020202020',
        },
      ],
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    tabFn(i) {
      console.log(i);
    } 
  },
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.demo-nav-wrap {
  overflow-x: auto;
  position: relative;
  // scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
}

.demo-nav-list {
  white-space: nowrap;
  padding: 0 10px;
}

.demo-nav-list::after {
  content: '';
  position: absolute;
  bottom: 7px;
  left: calc(var(--pointer-x) * 1px);
  width: calc(var(--pointer-width) * 1px);
  border-top: 2px solid red;
  transition: left ease 0.3s;
}

.demo-nav-item {
  display: inline-flex;
  height: 50px;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  transition: color ease 0.2s;

  &.active {
    color: red;
  }
}
</style>