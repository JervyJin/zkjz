<template>
  <div class="div">
    <lg-header></lg-header>
    <!-- <img class="img" src="../../assets/img/logo.png" alt> -->
    <lc-conent></lc-conent>
  </div>
</template>

<script>
import LgHeader from "./components/LoginHeader";
import LcConent from "./components/LoginContent";
export default {
  components: {
    LgHeader,
    LcConent
  },
  created() {
    this.$store.state.headerStatus = false;
  }
};
</script>

<style scoped>
.div {
  background: #ffffff;
  margin: 0 auto;
  min-height: 100%;
  padding-top: 3.23rem;
  overflow-y: auto;
}
</style>