<template>
  <div class="relative" style="height: 100%; overflow: hidden;">
    <Codemirror
      v-model:value="Log"
      :options="cmOptions"
      :border="true"
      height="100%"
    />
    <div class="refresh" @click="getlog">
      <img src="../../../assets/refresh.png" alt="">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Codemirror from 'codemirror-editor-vue3'
import { getLog } from '@/api'

const Log = ref()

getlog()

function getlog() {
  getLog().then((data: any) => {
    data && (Log.value = data.split('\n').reverse().join('\n').trim())
  })
}

const cmOptions = {
  mode: 'log',
  theme: 'default',
  lineNumbers: true,
  smartIndent: true,
  indentUnit: 2,
  foldGutter: true,
  styleActiveLine: true,
  readOnly: true
}

</script>

<style lang="postcss" scoped>
.refresh {
  height: 50px;
  width: 50px;
  position: absolute;
  right: 15px;
  bottom: 15px;
  cursor: pointer;
}
</style>
