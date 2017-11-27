<template>
  <div class="slishow">
      <input type="text" name="" id="" placeholder="新标题" v-model="$store.state.titles" >
      <label for="">
          选择分类：
          <select name="" id="" v-model="seltiv">
              <option value="dev">只能发表到测试帖！</option>
          </select>
      </label>
      <textarea name="" id="" v-model="$store.state.centont" cols="30" rows="10" placeholder="为了避免日常版面被污染，只能发帖到专门的测试帖，请输入内容."></textarea>
      <button @click="pushtab">发表</button>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
    name: 'slishiw',
    computed:{
        ...mapState([
            'seltiv'
        ])
    },
    methods:{
        ...mapActions([
            'pushtab'
        ])
    }
}
</script>

<style lang="scss">
.slishow{
    position: absolute;top:3rem;left:0;z-index:2;
    width:100%;height:auto;background:#fff;
    min-height:100%;box-sizing: border-box;padding:15px;


    *{

        border-radius: 0.2rem;
        margin: 1rem 0;
    }

    input{
        display: inherit;
        width: 99%;
        height: 2rem;
        border: 1px solid #ccc;
        -webkit-box-shadow: 0 0px 3px #cccccc8c;
        box-shadow: 0 0px 3px #cccccc8c;
        font-size: 1rem;
    }

    select{
        height: 2rem;
        padding: 0 1rem;
        border: 1px solid #ccc;
        box-shadow: 0 0px 3px #cccccc8c;
    }

    textarea{
        width: 99%;
        border: 1px solid #ddd;
        -webkit-box-shadow: 0 0px 3px #cccccc8c;
        box-shadow: 0 0px 3px #cccccc8c;
        font-size: 1.1rem;
        box-sizing: border-box;
        padding: 8px;
    }

    button{
        float: right;
        padding: 0.3rem 1rem;
        border: 1px solid #498ce0;
        background: #579ffb;
        color: #fff;
        box-shadow: 0 1px 7px #579ffb;
    }
}
</style>
