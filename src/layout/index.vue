<template>
  <div class="layout">
    <el-container class="layout-contianer">
      <el-aside width="180px">
        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'

</script>

<style lang="postcss" scoped>
.layout {
  height: 100%;
  & .layout-contianer {
    height: 100%;
  }
  & .el-header {
    border-bottom: 1px solid rgba(60, 60, 60, .12);
  }

  & .el-main {
    background-color: #f6f8f9;
    & > div {
      min-width: 900px;
    }
  }
}
</style>
