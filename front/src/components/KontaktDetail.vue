<template>
    <PersonalData v-if="kontakt && kontakt.type === 'prospekt'" :osoba="kontakt.osoba" />
    <PersonalCard v-if="kontakt && kontakt.type !== 'prospekt'" :osoba="kontakt.osoba" />
    <hr />
    <Konverzace v-if="kontakt && kontakt.type === 'prospekt'" :jmeno="kontakt.osoba.jmeno" :zpravy="kontakt.zpravy" />
</template>

<script>
import PersonalData from '@/components/PersonalData.vue'
import PersonalCard from '@/components/PersonalCard.vue'
import Konverzace from '@/components/Konverzace.vue'

export default {
    name: "KontaktDetail",
    components: { PersonalData, Konverzace, PersonalCard },
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    computed: {
        kontakt() {
            return this.$store.getters.kontakt
        }
    },
    
    watch: {
        id() {
            this.$store.dispatch("nacistKontakt", this.id)
        }
    },
    mounted() {
        this.$store.dispatch("nacistKontakt", this.id)
    }
}
</script>