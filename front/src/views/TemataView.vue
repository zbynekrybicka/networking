<template>
    <div v-if="isLoggedIn">
        <template v-if="!id">
            <Table :data="temata" :headers="{ id: 'ID', tema: 'Téma', bullets: 'Počet odrážek' }" @row-click="gotoTema($event)" />
            <PridatTema />
        </template>
        <TemaDetail v-if="id" :id="id" />
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import TemaDetail from '@/components/TemaDetail.vue';
import PridatTema from '@/components/PridatTema.vue';
export default {
    name: "TemataView",
    components: { Table, TemaDetail, PridatTema },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn
        },
        id() {
            return parseInt(this.$route.params.id)
        },
        temata() {
            return this.$store.getters.temata.map(x => {
                return {
                    ...x, 
                    bullets: this.$store.getters.bulletsByTemaId(x.id).length
                }
            })
        }
    },
    methods: {
        gotoTema(tema) {
            this.$router.push("/temata/" + tema.id)
        }
    }

}

</script>