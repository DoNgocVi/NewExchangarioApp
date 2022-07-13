<template>
  <div id="exchangario">
    <exchange-hero />
    <exchangle-list
      :exchanges="exchanges"
    />
    <exchange-pagination />
  </div>
</template>

<script>
import ExchangleList from "../components/ExchangleList.vue";
import ExchangePagination from "../components/Pagination.vue";
import ExchangeHero from "../components/Hero.vue";
// import useAuth from "../composition/useAuth";

export default {
  components: {
    ExchangleList,
    ExchangePagination,
    ExchangeHero
  },
  computed: {
    exchanges() {
      return this.$store.state.exchange.items;
    }
  },
  // setup() {
  //   return useAuth();
  // },
  // watch:{
  //   isAuthenticated(isAuth){
  //      if(isAuth){
  //       this.$router.push("/login")
  //      }
  //   }
  // },
  created() {
    this.$store.dispatch("exchange/getExchanges");
  }
}
</script>

<style scoped>
 .counter-container {
   padding: 200px;
   font-size: 60px;
 }
</style>
