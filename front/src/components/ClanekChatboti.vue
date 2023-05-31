<template>
    <div>
        <h3 class="font-weight-bold">Chatboti</h3>

        <div class="form-group">
            <select class="form-control" placeholder="Přidat chatbota..." @change="pridatChatbota" >
                <option :value="0">-- vyber chatbota --</option>
                <option v-for="chatbot of chatbotiMimoClanek" :value="chatbot.id" :key="chatbot.id">{{ chatbot.jmeno }}</option>
            </select>
        </div>

        <div class="row">
            <div v-for="chatbot of chatbotiVClanku" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card pt-3 pl-3 pr-3">
                    <img class="card-img-top" :src="api + '/chatboti_obrazky/' + chatbot.id + '.jpg'" :alt="chatbot.jmeno">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">{{ chatbot.jmeno }}</h5>
                        <p class="card-text">{{ chatbot.popis }}</p>
                        <button href="#" class="btn btn-primary mb-2" @click="_chatbot = chatbot">Editovat chat</button>
                        <button href="#" class="btn btn-danger" @click="odebratChatbota(chatbot)">Vyřadit chatbota</button>
                    </div>
                </div>
            </div>
        </div>

        <ChatbotScenar v-if="_chatbot" :chatbot="_chatbot" @close="_chatbot = null" />
    </div>
</template>

<script>
import ChatbotScenar from '@/components/ChatbotScenar.vue'

export default {
    name: "ClanekChatboti",
    components: { ChatbotScenar },
    data: () => ({ _chatbot: null }),
    computed: {
        id() {
            return parseInt(this.$route.params.id)
        },
        api() {
            return window.API_URL
        },
        chatbotiId() {
            return this.$store.getters.clankyChatboti.filter(cc => cc.clanek_id === this.id).map(cc => cc.chatbot_id)
        },
        chatbotiVClanku() {
            return this.$store.getters.chatboti.filter(c => this.chatbotiId.includes(c.id))
        },
        chatbotiMimoClanek() {
            return this.$store.getters.chatboti.filter(c => !this.chatbotiId.includes(c.id))
        }
    },

    methods: {
        pridatChatbota(e) {
            this.$store.dispatch("postClankyChatboti", { chatbot_id: parseInt(e.target.value), clanek_id: this.id })
            e.target.value = 0
        },
        odebratChatbota(chatbot) {
            this.$store.dispatch("deleteClankyChatboti", [ chatbot.id, this.id ])
        }
    }
}
</script>