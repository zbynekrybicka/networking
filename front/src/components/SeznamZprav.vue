<template>
    <ul>
        <li v-for="(zprava, index) of zpravy" :key="zprava.id" class="bez-odrazky">
            <div class="list-group-item" :class="odeslanaZprava ? 'list-group-item-success' : 'list-group-item-info'">
                <input type="text" v-model="zprava.zprava" class="form-control" @change="ulozZpravu(index)" ref="polozka" />
            </div>
            <SeznamZprav :zprava_id="zprava.id" :odeslanaZprava="!odeslanaZprava" v-if="rozbaleno[index]" />
        </li>
        <li class="bez-odrazky" v-if="odeslanaZprava && zpravy.length === 0 || !odeslanaZprava">
            <div class="list-group-item list-group-item-warning">
                <input type="text" placeholder="Nová zpráva..." @change="novaZprava" class="form-control" ref="novaZprava"/>
            </div>
        </li>
    </ul>
</template>

<script>
import SeznamZprav from './SeznamZprav'

export default {
    name: "SeznamZprav",
    components: { SeznamZprav },
    data: () => ({
        rozbaleno: []
    }),
    props: {
        zprava_id: { type: Number, required: false, default: null },
        odeslanaZprava: { type: Boolean, required: true },
    },
    computed: {
        zpravy() {
            return this.$store.getters.zpravy.filter(z => z.zprava_id === this.zprava_id)
        }
    },
    methods: {
        novaZprava(e) {
            this.$store.dispatch('postZpravy', { zprava_id: this.zprava_id, zprava: e.target.value }).then(() => {
                if (this.odeslanaZprava) {
                    this.rozbaleno.push(true)
                }
            })
            e.target.value = ""
        },
        rozbal(zprava, index) {
            const match = zprava.zprava.match(/(.*)\+\+$/)
            if (match) {
                zprava.zprava = match[1]
                this.rozbaleno[index] = !this.rozbaleno[index]
                return true
            }
            return false
        },
        smazZpravu(zprava) {
            if (zprava.zprava.length === 0 && confirm('Opravdu chcete smazat zprávu včetně všech následujících?')) {
                this.$store.dispatch('deleteZpravy', zprava)
                return true
            } 
            return false
        },
        ulozZpravu(index) {
            const zprava = this.zpravy[index]
            if (!this.rozbal(zprava, index) && !this.smazZpravu(zprava)) {
                this.$store.dispatch('putZpravy', zprava)
            }
        }
    },
    mounted() {
        if (this.zpravy.length === 0) {
            this.$refs.novaZprava.focus()
        } else {
            this.$refs.polozka[0].focus()
        }
        this.rozbaleno = this.zpravy.map(() => false)
    }

}
</script>

<style>
.bez-odrazky {
    list-style-type: none;
}
</style>