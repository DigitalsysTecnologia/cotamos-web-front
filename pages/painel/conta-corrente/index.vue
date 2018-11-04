<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <h1 class="subtitle text-center">conta-corrente</h1>
            </div>
        </div>        

        <div class="row">
            <div class="col-md-12">
                <EntryList :entries="entries" />
            </div>
        </div>        
    </div>
</template>

<script>
import EntryList from "../components/EntryList";
export default {
  name: "Account",
  data() {
    return {
      entries: []
    };
  },
  mounted() {
      this.entries.push({
          _id: '123',
          date: '2018-09-01T00:00:00-03:00',
          clients: 0,
          salesComissionValue: 0
      })
  },
  components: {
    EntryList: EntryList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
