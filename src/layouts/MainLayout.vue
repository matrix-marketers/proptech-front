<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Quasar
        </q-toolbar-title>
        <div class="q-pa-md on-right">
          <q-btn v-if="token" color="primary"
          @click="logout()"
            class="red"
            label="Logout" />

          <q-btn v-if="!token"  color="primary"
            to="account-signin"
            class="red"
            label="Login" />
          <q-btn v-if="!token"  color="primary"
            to="register"
            class="red"
            label="Register" />
        </div>
      </q-toolbar>

      <q-tabs v-if="token" align="left">
        <q-route-tab to="/classes" label="Classes" />
        <q-route-tab to="/students" label="Students" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  methods: {
    logout () {
      localStorage.setItem('token', '')
      // redirect({ path: '/account-signin' })
      api.defaults.headers.common.Authorization = ''
      window.location.reload()
    }
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
