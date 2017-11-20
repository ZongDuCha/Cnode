<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
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
