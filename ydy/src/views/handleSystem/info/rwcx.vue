<template>
  <div class="page">
    <template >
      <List @showDetail="showDetail"/>
    </template>
    <!-- <template >
      <Detail @showDetail="showDetail"/>
    </template> -->
  </div>
</template>

<script>
import List from './children/list.vue'
// import Detail from './children/detail.vue'
export default {
  components: {
    List,
    // Detail
  },
  data() {
    return {
    //   isDetail: false
    }
  },
  methods: {
    showDetail(o) {
        console.log(o)
      this.$router.push('/zfxt/detail');
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>