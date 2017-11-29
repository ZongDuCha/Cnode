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
#app{
  height: 100%;
}
html,body{
  height: 100%;width: 100%;margin:0;padding:0;
}
.menu-fade-enter-active {
  transition: all 150s ease;
}
.menu-fade-leave-active {
  transition: all 150s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.menu-fade-enter, .menu-fade-leave-to {
  transform: translateX(1000px);
  opacity: 0;
}
</style>
