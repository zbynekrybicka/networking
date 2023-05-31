<template>
    <div v-if="chatbot">
        <div class="row mb-3">
            <div class="col-2">
                <img :src="api + '/chatboti_obrazky/' + chatbot.id + '.jpg'" :alt="chatbot.jmeno" class="chatbot-photo" />
            </div>
            <div class="col-10 form-group">
                <h1 class="font-weight-bold">{{ chatbot.jmeno }}</h1>
                <input type="text" class="form-control" v-model="scenar.titulek" @change="ulozTitulek" />
            </div>
        </div>

        <li class="bez-odrazky">
            <div class="list-group-item list-group-item-success">
                <input type="text" v-model="zprava.zprava" class="form-control" @change="ulozZpravu" />
            </div>
            <SeznamZprav :zprava_id="zprava.id" :odeslanaZprava="false" />
        </li>
    </div>
</template>

<script>
import SeznamZprav from '@/components/SeznamZprav.vue'

export default {
    name: "ChatbotScenar",
    components: { SeznamZprav },
    computed: {
        api() {
            return API_URL
        },
        id() {
            return parseInt(this.$route.params.id)
        },
        chatbot() {
            return this.$store.getters.chatbotByScenar(this.id)
        },
        zprava() {
            return this.$store.getters.zpravy.find(z => z.id === this.id)
        },
        scenar() {
            return this.$store.getters.scenare.find(s => s.zprava_id === this.id)
        }
    },
    methods: {
        ulozZpravu() {
            this.$store.dispatch('putZpravy', this.zprava)
        },
        ulozTitulek() {
            this.$store.dispatch('putZpravyChatboti', this.scenar)
        }
    }
}
</script>

<style>
.chatbot-photo {
    width: 100%;
    border-radius: 100%;
}
</style>