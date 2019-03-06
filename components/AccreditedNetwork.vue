<template>
  <div>
    <div class="tabs">
      <ul>
        <li v-bind:class="{ 'is-active': currentTab == 'map' }"><a v-on:click="setCurrentTab('map')">Ver Mapa</a></li>
        <li v-bind:class="{ 'is-active': currentTab == 'list' }"><a v-on:click="setCurrentTab('list')">Ver Lista</a></li>
      </ul>
    </div>
    <div>
      <div id="map" v-bind:class="{ 'invisible': currentTab != 'map' }"/>
    </div>
    <div>
      <div v-bind:class="{ 'accredited-network': true, 'invisible': currentTab != 'list' }">
        <p v-for="(map,idx) in serviceArea" :key="idx">
          <span style="display:block;">
            <span style="font-weight: bold;">Nome:</span>
            {{map.name}}
          </span>
          <span style="display:block;">
            <span style="font-weight: bold;">Endereço:</span>
            {{ formatAddress(map) }}
          </span>
          <span style="display:block;">
            <span style="font-weight: bold;">Distância:</span>
            {{ formatDistance(map.distance) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccreditedNetwork",
  data() {
    return {
      currentTab: 'map'
    };
  },  
  props: {
    serviceArea: {
      type: Array,
      required: true
    },
    homeLocation: {
      type: Object,
      required: true
    },

  },
  created() {
  },
  async updated() {
    if (this.mapCreated) return;

    const { latitude, longitude } = this.homeLocation;

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 12
    });

    this.serviceArea.forEach(serviceAreaItem => {
      new google.maps.Marker({
        position: {
          lat: serviceAreaItem.lat,
          lng: serviceAreaItem.long
        },
        map: map
      });
    });

    this.mapCreated = true;
  },
  components: {
  },
  methods: {
    setCurrentTab (tabName) {
      this.currentTab = tabName;
    },
    formatDistance: function(distance) {
      let result = distance.toFixed(2);
      result = result.replace(".", ",");
      return result + " Km";
    },
    formatAddress: function(mapItem) {
      return `${mapItem.street}, ${mapItem.number}, ${mapItem.neighborhood} - ${mapItem.city}, ${mapItem.state}`
    } 
  }
};
</script>

<style scoped>
#map {
  width: 100%; 
  height:500px;
      border: 1px solid;
    padding: 10px;
}

.accredited-network {
  max-height: 300px;
  overflow-y: scroll;
      border: 1px solid;
    padding: 10px;
}

.invisible {
   display: none;
}
</style>
