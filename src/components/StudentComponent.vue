<template>

  <div class="q-pa-md">
    <div class="q-pa-md on-right">
        <q-btn color="primary"
          @click="addNew()"
          label="Add student" />
    </div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-center">Id</th>
          <th class="text-center">Name</th>
          <th class="text-center">Age</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="!students.length"
        >
          <td class="text-center text-danger" colspan="6">No records found</td>
        </tr>
        <tr
          v-else
          v-for="(data, index) in students"
          :key="index"
        >
          <td class="text-center">{{data.id}}</td>
          <td class="text-center">{{data.name}}</td>
          <td class="text-center">{{data.age}}</td>
          <td class="text-center">
            <q-btn
              flat
              icon="delete"
              color="negative"
              @click="deleteStudent(data.id)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <q-dialog
      v-model="editModal"
      @hide="cancelEditEmployee"
    >
      <q-card
        style="width: 700px; max-width: 80vw;"
      >
        <q-card-section>
          <div class="text-h6">Add new student</div>

          <q-form
              @submit="onSubmit"
              class="q-gutter-md"
              >
              <q-input
                  filled
                  v-model="name"
                  label="Student Name *"
                  hint="Name and surname"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
                  filled
                  type="number"
                  v-model="age"
                  label="Student age *"
                  lazy-rules
                  :rules="[
                  val => val !== null && val !== '' || 'Please type your age',
                  val => val > 0 && val < 100 || 'Please type a real age'
                  ]"
              />

              <div>
                  <q-btn label="Submit" type="submit" color="primary"/>
                  <q-btn label="Close" type="button" @click="cancelAdd()" color="primary" flat class="q-ml-sm" />
              </div>
              </q-form>
          </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { ref } from 'vue'
const name = ref(null)
const age = ref(null)

export default {

  data () {
    return {
      students: [],
      student_enroll: null,
      editModal: false,
      editingIndex: null

    }
  },
  methods: {
    addNew () {
      this.editModal = true
    },
    cancelAdd () {
      this.onReset()
      this.editModal = false
    },
    updatelist () {
      api.get('/students')
        .then(response => {
          this.students = response.data.data
        })
        .catch(error => console.log('Error', error.message))
    },
    onSubmit () {
      api.post('/students', { name: name.value, age: age.value }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          this.successMessage(response)
          this.updatelist()
          this.editModal = false
          this.onReset()
        })
        .catch(error => this.errorMessage(error)
        )
    },
    deleteStudent (dataid) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you really like to delete?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        api.delete('/students/' + dataid, { headers: { 'Content-Type': 'application/json' } })
          .then(response => {
            this.successMessage(response)
            this.updatelist()
            this.editModal = false
          })
          .catch(error => this.errorMessage(error)
          )
      })
    }
  },
  mounted () {
    this.updatelist()
  },

  setup () {
    const $q = useQuasar()

    return {
      name,
      age,
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
        name.value = null
        age.value = null
      }
    }
  }

}
</script>
