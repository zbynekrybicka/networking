<template>
    <div class="tema-slajdy">
        <template v-for="slajd in slajdy" :key="slajd.id">
            <div class="form-group">
              <input type="text" class="form-control nadpis" v-model="slajd.nadpis" @change="updateSlajd(slajd)" :ref="'slajd-' + slajd.id"/>
            </div>
            <Bullets :slajd="slajd" />
            <div class="form-group">
              <textarea class="form-control" rows="10" v-model="slajd.video" @change="updateSlajd(slajd)"></textarea>
            </div>
        </template>
    
        <div class="form-group">
            <input type="text" class="form-control" v-model="nadpis" placeholder="--" @change="createOdstavec" />
        </div>
        <button @click="createOdstavec" class="btn btn-primary">Přidat</button>
    </div>
  </template>
  
  <script>
  import Bullets from '@/components/Bullets.vue'

  export default {
    components: { Bullets },
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    computed: {
      slajdy() {
        return this.$store.getters.slajdyById(this.id);
      }
    },
    data() {
      return {
        nadpis: "",
        obsah: ""
      };
    },
    methods: {
      updateSlajd(slajd) {
        console.log(slajd)
        if (slajd.nadpis.length > 0 || !confirm('Chcete smazat slajd?')) {
            this.saveSlajd(slajd)
        } else {
            this.deleteSlajd(slajd.id)
        }
      },

      createSlajd() {
        this.$store.dispatch("createSlajd", { 
            tema_id: this.id,
            nadpis: this.nadpis, 
            obsah: this.obsah,
        })
        this.nadpis = ""
        this.obsah = ""
      },

      saveSlajd(slajd) {
        this.$store.dispatch("saveSlajd", slajd)
      },

      deleteSlajd(id) {
        this.$store.dispatch("deleteSlajd", id)
      }
    },
  };
  </script>
  
<style>
.tema-slajdy .nadpis {
    font-size: 14pt;
    font-weight: bold;
}

</style>