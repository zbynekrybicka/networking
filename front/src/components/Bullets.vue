<template>
    <div>
        <div class="row" v-for="bullet of bullets" :key="bullet.id">
            <div class="form-group col-sm-3 col-xs-12 ">            
                <input type="text" class="form-control" v-model="bullet.class_name" @change="updateBullet(bullet)" />
            </div>
            <div class="form-group col-sm-9 col-xs-12">            
                <input type="text" class="form-control" v-model="bullet.obsah" @change="updateBullet(bullet)" />
            </div>
        </div>
        <div class="form-group">
            <input type="text" class="form-control" v-model="newBullet" placeholder="Nová odrážka..." @change="createBullet" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Bullets",
    props: {
        slajd: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            newBullet: ""
        }
    },
    computed: {
        bullets() {
            return this.$store.getters.bulletsBySlajdId(this.slajd.id)
        }
    },

    methods: {
        createBullet() {
            this.$store.dispatch("createBullet", { slajd_id: this.slajd.id, obsah: this.newBullet })
            this.newBullet = ""
        },
        updateBullet(bullet) {
            if (bullet.obsah.length > 0) {
                this.$store.dispatch("updateBullet", bullet)
            } else {
                this.$store.dispatch("deleteBullet", bullet)
            }
        }
    }
}
</script>