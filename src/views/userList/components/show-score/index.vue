<template>
  <el-dialog v-model="dialogVisible" title="学习积分" width="580px">
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
      <div class="w-2/6">
        {{ `${item.name} (${item.score})` }}
      </div>
      <el-progress
        class="flex-1"
        :text-inside="true"
        :stroke-width="24"
        :color="colors[index]"
        :percentage="item.percentage !== null ? item.percentage : 100"
      />
    </div>
  </el-dialog>
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
  value: boolean
}
const props = withDefaults(defineProps<Props>(), {
  score: '',
  value: false
})

const emit = defineEmits(['value'])

const dialogVisible = computed({
  get() {
    return props.value
  },
  set(val) {
    emit('value', val)
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

<style lang="postcss" scoped>
.total {
  margin-bottom: 30px;
  & h1 {
    font-size: 28px;
    font-weight: 700;
  }
}
.detail:not(:last-child) {
  padding-bottom: 20px;
}
</style>
