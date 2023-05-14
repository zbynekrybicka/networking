<template>
    <EditovatTema :id="id" />
    <hr />
    <TemaOdstavce :id="id" />
</template>

<script>
import EditovatTema from '@/components/EditovatTema.vue'
import TemaOdstavce from '@/components/TemaOdstavce.vue'

export default {
    name: "TemaDetail",
    components: { EditovatTema, TemaOdstavce },
    props: {
        id: {
            type: Number,
            required: true
        }
    }
}
</script>