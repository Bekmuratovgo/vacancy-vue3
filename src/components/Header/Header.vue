<template>
  <div class="header">
    <div class="header_blockLeft">
        Logo here
    </div>
    <div class="header_blockRight">
        <router-link 
            :to="{ path: '/'}" 
            class="header_blockRight__route"
            :class="[currentPage.item === '#/' && 'active_nav']"
            v-on:click="currentPage.item = '#/'"
        >
            List-page
        </router-link>
            
        <router-link 
            :to="{ path: '/converter'}" 
            class="header_blockRight__route"
            :class="[currentPage.item === '#/converter' && 'active_nav']"
            v-on:click="currentPage.item = '#/converter'"
        >
            Converter-page
        </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';


export default {
    name: 'Header-page',

  setup (props, context) {
    let currentPage = ref({
        item: window.location.hash
    })

    return {
        currentPage,
    }
  }
}
</script>

<style lang="scss">
.header {
    width: 100%;
    height: 44px;
    padding: 10px;
    background: #1976d2;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    text-transform: uppercase;
    font-weight: 500;
    color: white;
    display: flex;
    .header_blockLeft {
        width: 50%;
    }
    .header_blockRight__route {
        text-transform: none;
        margin: 0 10px;
        color: white;
        text-decoration: none;
    }
    .header_blockRight__route:hover {
        color: #16c60c;
    }

    .active_nav {
        color: #16c60c;
    }
}
</style>
