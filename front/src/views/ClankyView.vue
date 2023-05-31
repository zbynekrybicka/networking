<template>
    <div v-if="isLoggedIn">
        <div v-if="!id">
            <Table :data="clanky" :headers="{ kategorie: 'Kategorie', nadpis: 'Název'}" @row-click="vybratClanek" />
            <button class="btn btn-primary" @click="novyClanek">Úplně nový článek</button>
        </div>
        <ClanekDetail v-if="id" />
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import ClanekDetail from '@/components/ClanekDetail.vue';

export default {
    name: "ClankyView",
    components: { Table, ClanekDetail }, 
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn
        },
        id() {
            return !!this.$route.params.id
        },
        clanky() {
            return this.$store.getters.clanky;
        }
    },
    methods: {
        novyClanek() {
            this.$store.dispatch('postClanek').then(clanek => {
                this.$router.push('/clanky/' + clanek.id)
            })
        },
        vybratClanek(clanek) {
            this.$router.push('/clanky/' + clanek.id)
        }
    }
}
</script>