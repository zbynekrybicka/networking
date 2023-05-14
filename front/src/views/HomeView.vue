<template>
  <div>
    <LoginView v-if="!isLoggedIn" />
    <DashboardView v-if="isLoggedIn" />
  </div>
</template>

<script>
import LoginView from './LoginView'
import DashboardView from './DashboardView'

export default {
  name: 'HomeView',
  components: { LoginView, DashboardView },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  }

}
</script>
