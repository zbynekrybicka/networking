<template>
    <div v-if="isLoggedIn">
        <template v-if="!id">
            <Table :data="prospekti" :headers="{ id: 'ID', jmeno: 'Jméno', tagy: 'Tagy', zpravy: 'Počet zpráv', posledni_zprava: 'Poslední zpráva' }" @row-click="gotoProspekt($event)" />
        </template>
        <template v-if="id">
            <KontaktDetail :id="id" />
        </template>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import KontaktDetail from '@/components/KontaktDetail.vue';

export default {
    name: "KontaktyView",
    components: { Table, KontaktDetail },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn
        },
        id() {
            return parseInt(this.$route.params.id)
        },
        prospekti() {
            return this.$store.getters.prospekti
        }
    },
    methods: {
        gotoProspekt(prospekt) {
            this.$router.push("/kontakty/" + prospekt.id)
        }
    }

}
</script>