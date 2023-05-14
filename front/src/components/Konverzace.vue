<template>
    <h2 @click="zobrazitKonverzaci = !zobrazitKonverzaci" style="cursor: pointer">Konverzace</h2>
    <Table v-if="zobrazitKonverzaci" :data="zobrazeneZpravy" :headers="{ datum: 'Datum', autor: 'Autor', obsah: 'Zpráva' }" :rowStyle="stylKonverzace" />
</template>
<script>
import Table from './Table.vue';

export default {
    name: "Konverzace",
    props: {
        jmeno: {
            type: String,
            required: true
        },
        zpravy: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            zobrazitKonverzaci: false
        }
    },
    components: { Table },
    computed: {
        stylKonverzace() {
            return x => !x.od_mne ? 'bg-success' : 'bg-light'
        },
        zobrazeneZpravy() {
            if (!this.zpravy) {
                return []
            }
            return this.zpravy.map(z => ({
                datum: z.datum_casu,
                od_mne: z.od_mne,
                autor: z.od_mne ? "Já" : this.jmeno,
                obsah: z.obsah,
            }))
        }
    }
}
</script>