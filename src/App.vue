<template>
  <HeaderVue />
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import HeaderVue from './components/Header/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    HeaderVue,
  }
})
</script>

