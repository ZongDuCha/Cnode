<template>
  <div id="app">
    <Top/>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import Top from './components/Top'
export default {
  name: 'app',
  components:{ Top }
}
</script>

<style lang="scss">
*{
  margin:0;padding:0;list-style: none;text-decoration: none;word-break: break-word;
}
html,body{
  height: 100%;width: 100%;margin:0;padding:0;
}
</style>
