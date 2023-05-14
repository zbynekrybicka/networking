<template>
    <div>
      <input type="text" v-model="tema" placeholder="Přidat téma" class="form-control" @change="createTema">
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tema: '',
      };
    },
    methods: {
      createTema() {
        this.$store.dispatch('createTema', this.tema);
        this.tema = '';
      },
    },
  };
  </script>
  