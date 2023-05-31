<template>
    <div v-if="isLoggedIn">
        <div v-if="!id">
            <Table :data="scenare" :headers="{ jmeno: 'Chatbot', titulek: 'Titulek', zprava: 'Zpráva' }" @row-click="vybratScenar" />
            
            <select class="form-control" @change="novyScenar">
                <option :value="null">-- Vyberte chatbota ---</option>
                <option v-for="chatbot of chatboti" :value="chatbot.id" :key="chatbot.id">{{ chatbot.jmeno }}</option>
            </select>
        </div>  
        <div v-if="id">
            <ChatbotScenar />        
        </div>      
    </div>
</template>

<script>
import Table from '@/components/Table.vue'
import ChatbotScenar from '@/components/ChatbotScenar.vue'

export default {
    name: "ScenareView",
    components: { Table, ChatbotScenar },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn
        },
        id() {
            return !!this.$route.params.id
        },
        chatboti() {
            return this.$store.getters.chatboti
        },
        scenare() {
            return this.$store.getters.scenare 
        }
    },
    methods: {
        vybratScenar(scenar) {
            this.$router.push('/scenare/' + scenar.zprava_id)
        },
        novyScenar(e) {
            this.$store.dispatch('postZpravyChatboti', parseInt(e.target.value)).then(id => this.$router.push('/scenare/' + id))
            e.target.value = null
        }
    }
}
</script>