<template>
    <div>
        <div class="form-group">
            <input type="text" class="form-control font-weight-bold input-nazev" placeholder="Název..." v-model="clanek.nadpis" @change="ulozClanek" />
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Podnadpis..." v-model="clanek.podnadpis" @change="ulozClanek" />
        </div>
        <div class="form-group">
            <input type="text" class="form-control input-meta" placeholder="Kategorie..." v-model="clanek.kategorie" @change="ulozClanek" />
        </div>
        <div class="form-group">
            <input type="text" class="form-control input-meta" placeholder="Slug..." v-model="clanek.slug" @change="ulozClanek" />
        </div>
        <div class="form-group">
            <input type="text" class="form-control input-meta" placeholder="ID videa na YouTube..." v-model="clanek.video" @change="ulozClanek" />
        </div>
        <div class="form-group">
            <textarea type="text" class="form-control" placeholder="Perex..." rows="3" v-model="clanek.perex" @change="ulozClanek"></textarea>
        </div>
        <div class="form-group">
            <textarea type="text" class="form-control" placeholder="Obsah..." rows="15" v-model="clanek.obsah" @change="ulozClanek"></textarea>
        </div>

        <ClanekChatboti />
    </div>
</template>

<script>
import ClanekChatboti from './ClanekChatboti.vue'

export default {
    name: "ClanekDetail",
    components: { ClanekChatboti },
    computed: {
        id() {
            return this.$route.params.id;
        },
        clanek() {
            return this.$store.getters.clanky.find(c => c.id === parseInt(this.id));
        },
        kategorie() {
            return Array.from(new Set(this.clanky.map(c => c.kategorie)));
        }
    },
    methods: {
        ulozClanek() {
            this.$store.dispatch("putClanek", this.clanek);
        }
    },
}
</script>

<style>
.input-nazev {
    font-size:28px !important;
}
.input-meta {
    color: #CCC !important;
}
</style>