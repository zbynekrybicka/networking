<template>
    <div>
      <form>
        <div class="row">
            <img :src="foto" :alt="jmeno"  class="col-sm-3 col-xs-12"/>
            <div class="col-sm-9 col-xs-12">
                <div class="form-group">
                    <h2>{{ jmeno }}</h2>
                </div>
            </div>
        </div>
      </form>
    </div>
</template>
<script>
export default {
    name: "PersonalData",
    props: {
        osoba: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            jmeno: "",
            foto: "",
        }
    },
    methods: {
        nactiOsobu(value) {
            if (value) {
                this.jmeno = value.jmeno
                this.foto = value.foto
            }
        }
    },
    watch: {
        osoba(value) {
            this.nactiOsobu(value)
        }
    },
    mounted() {
        this.nactiOsobu(this.osoba)
    }
}
</script>

<style>
label {
    font-weight: bold;
}
</style>