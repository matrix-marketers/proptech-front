<template>

  <div class="q-pa-md">
    <div class="q-pa-md on-right">
      <q-card
        style="width: 700px; max-width: 80vw;"
      >
        <q-card-section>
          <div class="text-h6">Register</div>
          <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              >
              <q-input
                  filled
                  v-model="name"
                  label="Name *"
                  lazy-rules
                  type="text"
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                  filled
                  v-model="email"
                  label="Email *"
                  lazy-rules
                  type="email"
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
               <q-input
                  filled
                  type="password"
                  v-model="password"
                  label="Password"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <div>
                  <q-btn label="Submit" type="submit" color="primary"/>
                  <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
              </q-form>
          </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { ref } from 'vue'
const email = ref(null)
const password = ref(null)
const name = ref(null)

export default {

  methods: {
    onSubmit () {
      api.post('/register', { name: name.value, email: email.value, password: password.value }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          this.successMessage(response)
          window.location.href = "/classes"
        })
        .catch(error => this.errorMessage(error)
        )
    }
  },

  setup () {
    const $q = useQuasar()

    return {
      email,
      password,
      name,
      successMessage (response) {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: response.data.message
        })
      },
      errorMessage (error) {
        $q.notify({
          color: 'red-4',
          textColor: 'white',
          message: error.message
        })
      },

      onReset () {
        email.value = null
        password.value = null
        name.value = null
      }

    }
  }
}
</script>
