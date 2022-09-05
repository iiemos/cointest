<template>
  <div ref="tabsWarp" class="home-tab">
    <nav ref="navBox" class="wiki-nav-wrap">
      <ul class="wiki-nav-list" :style="pointerStyle">
      <!-- <ul class="wiki-nav-list"> -->
        <li
          v-for="(item, index) of cate"
          :key="item.code"
          ref="navs"
          class="wiki-nav-item"
          :data-idx="item.code"
          :class="[ item.code == activeNavIdx ? 'home-tab-active' : '' ]"
          @click="handleNavClick(item,index)"
        >
          {{ transtion ? $v(item.name) : item.name }}
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
function scrollTo (el, warp, toPos, isHorizontal = true, rate = 2, cb) {
  const direction = isHorizontal ? 'scrollLeft' : 'scrollTop'
  // 根据滚动方向取出用来赋值的key

  const boxLimitKey = isHorizontal ? 'scrollWidth' : 'scrollHeight'
  // 根据滚动方向取出用来获取最大滚动范围的key

  // const windowLimitKey = isHorizontal ? 'innerWidth' : 'innerHeight'
  // 根据滚动方向取出用来获取最大滚动范围的key
  // const limitSize = el[boxLimitKey] - warp[windowLimitKey]
  const limitSize = el[boxLimitKey] - warp.offsetWidth
  let pos = el[direction]

  const isIncrease = toPos > pos
  if (isIncrease && toPos > limitSize) {
    toPos = limitSize
  } else if (!isIncrease && toPos < 0) {
    toPos = 0
  }

  if (toPos === pos) return cb && cb()
  // 如果当前位置已经是要滚到的地方，直接return

  function step () {
    pos = pos + (toPos - pos) / rate
    if ((isIncrease && toPos - pos <= 1) || (!isIncrease && pos - toPos <= 1)) {
      el[direction] = toPos
      cb && cb()
    } else {
      el[direction] = pos
      requestAnimationFrame(step)
    }
  }
  step()
}
export default {
  props: {
    cate: {
      type: Array,
      default: () => []
    },
    active: { // 是否默认选中
      type: Boolean,
      default: true
    },
    show: { // 是否显示
      type: Boolean,
      default: false
    },
    transtion: { // 是否翻译
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeNavIdx: this.active && (this.cate[0] ? this.cate[0].code : []),
      currentIndex: 0,
      pointerX: 0,
      pointerWidth: 12
    }
  },
  computed: {
    pointerStyle () {
      return {
        '--pointer-x': this.pointerX,
        '--pointer-width': this.pointerWidth
      }
    }
  },
  mounted () {
    /**
     *
     * @param {HTMLElement} el 滚动元素
     * @param {Number} toPos 滚动目标
     * @param {Boolean} isHorizontal 是否是水平滚动
     * @param {Number} rate 滚动速率
     * @param {Function} cb 滚动完成时的回调函数
     * @returns void
     */

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (fn) => {
        setTimeout(fn, 17)
        // 模拟屏幕每帧的刷新时间
        // 17 ≈ 1s = 1000ms / 屏幕刷新率(60hz)
      }
    }
    this.$nextTick(() => {
      this.handleUpdatePointerPos()
    })
  },
  methods: {
    tabFn (item) {
      this.$emit('tabFn', item)
    },
    handleNavClick (item, index) {
      this.currentIndex = index
      const { code } = item
      if (code == this.activeNavIdx) return
      this.activeNavIdx = code
      this.handleScrollNavToCenter(item)
    },
    handleScrollNavToCenter (item) {
      this.$emit('tabFn', item)
      const dom = this.$refs.navs[this.currentIndex]
      // 当前元素
      const navBox = this.$refs.navBox
      // 父元素元素
      const tabsWarp = this.$refs.tabsWarp
      // 滚动容器
      // dom.scrollIntoView({
      //     behavior: "smooth",
      //     block: "center",
      //     inline: "center"
      // });
      const { scrollLeft, scrollWidth } = navBox
      // 当前容器的滚动位置
      // 当前容器的宽度

      const limitScroll = scrollWidth - tabsWarp.offsetWidth
      // 当前容器可滚动最大值

      const halfScreenWidth = tabsWarp.offsetWidth / 2
      // 屏幕一半的宽度

      const domPosX = dom.offsetLeft
      // 当前item相对于滚动容器的x轴位置

      const width = dom.offsetWidth
      // width 元素宽度

      const centerAbsPosX = scrollLeft + halfScreenWidth
      // 当前屏幕x轴中心相对于滚动容器的绝对位置

      const domAbsPosX = domPosX + width / 2
      // 当前元素x轴中心点相对于滚动容器的x轴绝对位置

      const toPos = scrollLeft + (domAbsPosX - centerAbsPosX)
      // 要滚动到的位置

      this.scrollTo(navBox, tabsWarp, toPos)
      // 滚动相应元素

      const v = toPos > 0 && toPos < limitScroll ? toPos + halfScreenWidth : null
      // 计算滚动完成后元素相对于滚动容器的x轴位置
      this.handleUpdatePointerPos(v)
    },
    handleUpdatePointerPos (v) {
      const dom = this.$refs.navs[this.currentIndex]
      if (dom) {
        this.pointerWidth = dom.clientWidth
        if (!v) {
          v = (dom.offsetLeft + dom.offsetWidth / 2) - this.pointerWidth / 2
        }
        const SKL = v
        this.pointerX = SKL
      }
    },
    scrollTo
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wiki-nav-wrap {
  overflow-x: auto;
  position: relative;
  // scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
}

.wiki-nav-list {
  white-space: nowrap;
}

.wiki-nav-list::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: calc(var(--pointer-x) * 1px);
  width: calc(var(--pointer-width) * 1px);
  border-bottom: 1px solid #000;
  transition: left ease 0.3s;
}

.wiki-nav-item {
  display: inline-flex;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #9C9C9C;
  transition: color ease 0.2s;
  cursor: pointer;
  .active {
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 1px;
    display: block;
    background-color: #000;
  }
  .home-tab-active {
    font-weight: bold;
    color: #000;
  }
  li:hover {
    color: #000;
  }
  &.home-tab-active {
    color: #000;
  }
}
</style>
