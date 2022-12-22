<template>
  <div class="config-container h-full">
    <div class="editor-container">
      <nav>
        <div class="flex-1 flex items-center">
          <el-icon>
            <Document />
          </el-icon>
          <span style="padding-left: 8px;">config.yml</span>
        </div>
        <div class="flex-1 flex items-center flex-row-reverse">
          <el-button
            type="primary"
            size="small"
            plain
            @click="handleSave"
          >
            保存配置
          </el-button>
        </div>
      </nav>
      <div class="editor">
        <Editor
          v-if="conf"
          theme="vs-dark"
          defaultLanguage="yaml"
          v-model:value="conf"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Document } from '@element-plus/icons-vue'
import { showNotify } from 'vant'
import Editor from '@guolao/vue-monaco-editor'
import { getConfig, saveConfig } from '@/api'

const conf = ref('')

getConfig().then(({ data, success }: any) => {
  if (success) {
    conf.value = data
  }
})

async function handleSave() {
  const data = conf.value
  if (data) {
    const { success, error }: any = await saveConfig(data)
    showNotify({
      type: success ? 'success' : 'danger',
      message: success ? '配置保存成功！' : error
    })
  }
}

</script>

<style lang="postcss" scoped>
.config-container {
  background-color: #fff;

  & .editor-container {
    height: 100%;

    & nav {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 10px;
      height: 40px;
      font-size: 14px;
      border: 1px solid rgba(60, 60, 60, .12);
      background-color: #fff;
    }

    & .editor {
      height: calc(100% - 60px);
    }
  }
}
</style>
