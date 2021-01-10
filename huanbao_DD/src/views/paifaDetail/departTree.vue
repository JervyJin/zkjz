<template>
  <div class="page">
    <treeselect 
      v-model="value" 
      :default-expand-level="1" 
      :flat="true" 
      :multiple="true" 
      :options="options" 
      :normalizer="normalizer"
      @select="select"
    />
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { transformTree } from '@/util/util.js'

export default {
  props: ['query'],
  components: { Treeselect },
  data() {
    return {
      data:[],
      value: null,
      // define options
      options: [],
      normalizer(node) {
        return {
          id: node.ID,
          label: node.NAME,
          children: node.children,
        }
      },
    }
  },
  created() {
    this.getTree();
  },
  methods: {
    getTree() {  // type: 部门1 人2
      this.http
        .post("getOrgUserTreeByUserid", this.query)
        .then(res => {
          this.options = res.data.orglist
          // this.options = transformTree(res.data.orglist);
        });
    },
    select(node, instanceId) {
      if(node.type == 1) {
        return;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
  }
</style>