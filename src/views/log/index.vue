<template>
  <div style="height: 100%; overflow: hidden;">
    <Codemirror
      v-model:value="Log"
      :options="cmOptions"
      border
      height="100%"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Codemirror from 'codemirror-editor-vue3'
import { getLog } from '@/api'

const Log = ref()

getLog().then((data: any) => {
  data && (Log.value = data.split('\n').reverse().join('\n').trim())
})

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
