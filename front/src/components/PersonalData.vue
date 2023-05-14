<template>
    <div>
      <form>
        <div class="row">
            <img :src="foto" :alt="jmeno"  class="col-sm-3 col-xs-12"/>
            <div class="col-sm-9 col-xs-12">
                <div class="form-group">
                    <label for="jmenoInput">Jméno</label>
                    <input type="text" class="form-control" id="jmenoInput" v-model="jmeno" @change="saveOsoba">
                </div>
                <div class="form-group">
                    <label for="prezdivkaInput">Přezdívka</label>
                    <input type="text" class="form-control" id="prezdivkaInput" v-model="prezdivka" @change="saveOsoba">
                </div>
                <a href="#" @click.prevent="zobrazitKontaktniUdaje = !zobrazitKontaktniUdaje">Zobrazit/Skrýt kontaktní údaje</a>
            </div>
        </div>
        <template v-if="zobrazitKontaktniUdaje">
        <div class="form-group">
          <label for="fotoInput">Foto</label>
          <input type="text" class="form-control" id="fotoInput" v-model="foto" @change="saveOsoba">
        </div>
        <div class="form-group">
          <label for="emailInput">E-mail</label>
          <input type="text" class="form-control" id="emailInput" v-model="email" @change="saveOsoba">
        </div>
        <div class="form-group">
          <label for="telefonInput">Telefon</label>
          <input type="text" class="form-control" id="telefonInput" v-model="telefon" @change="saveOsoba">
        </div>
        <div class="form-group">
          <label for="facebookInput">Facebook</label>
          <input type="text" class="form-control" id="facebookInput" v-model="facebook" @change="saveOsoba">
        </div>
        <div class="form-group">
          <label for="messengerInput">Messenger</label>
          <input type="text" class="form-control" id="messengerInput" v-model="messenger" @change="saveOsoba">
        </div>
        <div class="form-group">
          <label for="instagramInput">Instagram</label>
          <input type="text" class="form-control" id="instagramInput" v-model="instagram" @change="saveOsoba">
        </div>
        <div class="form-group">
          <label for="youtubeInput">Youtube</label>
          <input type="text" class="form-control" id="youtubeInput" v-model="youtube" @change="saveOsoba">
        </div>
        <div class="form-group">
          <label for="linkedinInput">LinkedIn</label>
          <input type="text" class="form-control" id="linkedinInput" v-model="linkedin" @change="saveOsoba">
        </div>
        </template>
      </form>
    </div>
</template>
<script>
export default {
    name: "PersonalData",
    props: {
        osoba: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            zobrazitKontaktniUdaje: false,
            jmeno: "",
            prezdivka: "",
            foto: "",
            email: "",
            telefon: "",
            facebook: "",
            messenger: "",
            instagram: "",
            youtube: "",
            linkedin: "",            
        }
    },
    methods: {
        nactiOsobu(value) {
            if (value) {
                this.jmeno = value.jmeno
                this.prezdivka = value.prezdivka
                this.foto = value.foto
                this.email = value.email
                this.telefon = value.telefon
                this.facebook = value.facebook
                this.messenger = value.messenger
                this.instagram = value.instagram
                this.youtube = value.youtube
                this.linkedin = value.linkedin
            }
        }
    },
    watch: {
        osoba(value) {
            this.nactiOsobu(value)
        }
    },
    mounted() {
        this.nactiOsobu(this.osoba)
    }
}
</script>

<style>
label {
    font-weight: bold;
}
</style>