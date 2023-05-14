<template>
    <div v-if="temaById">
      <h1>Editovat téma</h1>
      <form>
        <div class="form-group">
          <label for="temaInput">Téma</label>
          <input type="text" class="form-control" id="temaInput" v-model="tema" @change="saveTema">
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: ['id'],
    data() {
      return {
        tema: '',
        temaById: null,
      }
    },
    created() {
        this.initTema(this.id)
    },
    methods: {
      initTema(id) {
        this.temaById = this.$store.getters.temaById(id)
        if (this.temaById) {
            this.tema = this.temaById.tema
        }
      },
      saveTema() {
        if (this.tema.length > 0 || !confirm('Chcete smazat téma?')) {
          this.$store.dispatch('saveTema', {
            id: this.id,
            tema: this.tema,
          })
        } else {
          this.$store.dispatch('deleteTema', this.id).then(() => {
            this.$router.push('/temata')
          })
        }
      }
    },
    watch: {
        id(temaId) {
            this.initTema(temaId)
        }
    }
  }
  </script>
  