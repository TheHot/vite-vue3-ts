<template>
  <van-popup
    class="score-popup flex flex-col justify-around"
    v-model:show="isShow"
    position="bottom"
    :style="{height: '60%'}"
  >
    <!-- 总分/今日 -->
    <div class="total flex">
      <div class="flex flex-1 justify-center flex-col items-center">
        <span>总分</span>
        <h1>{{ formatScore(score).score }}</h1>
      </div>
      <div class="flex flex-1 justify-center flex-col items-center">
        <span>今日</span>
        <h1>{{ formatScore(score).daily }}</h1>
      </div>
    </div>
    <!-- 各项得分 -->
    <div class="detail flex" v-for="(item, index) in formatScore(score).dailyList" :key="index">
      <div style="width: 8em;">
        {{ `${item.name} (${item.score})` }}
      </div>
      <el-progress
        class="flex-auto"
        :text-inside="true"
        :stroke-width="18"
        :color="colors[index]"
        :percentage="item.percentage !== null ? Math.ceil(item.percentage) : 100"
      />
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const colors = [
  '#6a994e',
  '#2a9d8f',
  '#e9c46a',
  '#f4a261',
  '#e76f51',
  '#118ab2',
  '#85586F'
]

interface Props {
  score: string
  modelValue: boolean
}
const props = withDefaults(defineProps<Props>(), {
  score: '',
  modelValue: false
})

const emit = defineEmits(['update:modelValue'])

const isShow = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

function formatScore(str: string) {
  const scoreList = str.split(/[\n]/).map(p => {
    // "当前学习总积分：82"
    const itemArr = p.split('：')
    const scoreModel = {
      name: itemArr[0],
      score: itemArr[1]
    }
    return scoreModel
  })
  const [score, daily, ...rest] = scoreList
  const dailyList = rest.map(item => {
    if (item.name === '专项答题') {
      item.score = item.score.split('/')[0] + '/5'
    }
    const scoreArr = item.score.split('/')
    return {
      ...item,
      percentage: 100 / Number(scoreArr[1]) * Number(scoreArr[0])
    }
  })
  return {
    score: score.score,
    daily: daily.score,
    dailyList
  }
}
</script>

<style lang="postcss">
.score-popup.van-popup {
  box-sizing: border-box;
  padding: 10px 16px;
}
</style>

<style lang="postcss" scoped>

.total {
  & h1 {
    font-size: 26px;
    font-weight: 700;
  }
}
</style>
