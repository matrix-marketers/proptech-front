<template>

  <div class="q-pa-md">
    <div class="q-pa-md on-right">
      <q-btn color="primary"
      @click="addNew()"
      class=""
        label="Add class" />
    </div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-center">Id</th>
          <th class="text-center">Name</th>
          <th class="text-center">Description</th>
          <th class="text-center">#Pending Seats</th>
          <th class="text-center">Enroll a student</th>
          <th class="text-center">Unenroll a student</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="!classes.length"
        >
          <td class="text-center" colspan="6">No records found</td>
        </tr>
        <tr
          v-else
          v-for="(data, index) in classes"
          :key="index"
        >
          <td class="text-center">{{data.id}}</td>
          <td class="text-center">{{data.name}}</td>
          <td class="text-center">{{data.description}}</td>
          <td class="text-center">{{data.pending_seats}}</td>
          <td class="text-center">
              <q-btn v-if="data.pending_seats>0" label="Enroll" @click="enrollStudent(data.id)" outline color="green" />
              <q-btn v-if="data.pending_seats==0" label="No vacant seats " outline  color="negative" class=" q-mt-md">
                <q-tooltip class="bg-red q-mt-md">All seats are full</q-tooltip>
              </q-btn>

          </td>
          <td class="text-center">
              <q-btn v-if="data.pending_seats<4" label="UnEnroll" @click="unenrollStudent(data.id)" outline color="negative" />
              <q-btn v-if="data.pending_seats>=4" label="UnEnroll" disabled outline  color="negative" class=" q-mt-md">
              </q-btn>

          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <q-dialog
      v-model="editModal"
    >
      <q-card
        style="width: 700px; max-width: 80vw;"
      >
        <q-card-section>
          <div class="text-h6">Add new class</div>

          <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              >
              <q-input
                  filled
                  v-model="name"
                  label="Class Name *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
               <q-input
                  filled
                  autogrow
                  v-model="description"
                  label="Description"
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
    </q-dialog>

    <q-dialog
      v-model="enrollModal"
    >
      <q-card
        style="width: 700px; max-width: 80vw;"
      >
        <q-card-section>
          <div class="text-h6">Enroll student</div>

          <q-banner v-if="!students.length" dense inline-actions class="text-white bg-red">
            No student record found, Please add student first
          </q-banner>
          <q-form v-else
              @submit="enrollSubmit"
              class="q-gutter-md"
              >

              <q-select  v-model="studentid" :options="students" label="Select Student" />

              <div>
                  <q-btn v-model="classid" label="Submit" type="submit" color="primary"/>
                  <q-btn label="Cancel" type="button" @click="cancelEnroll" color="primary" flat class="q-ml-sm" />
              </div>
              </q-form>
          </q-card-section>
      </q-card>
    </q-dialog>
     <q-dialog
      v-model="unenrollModal"
    >
      <q-card
        style="width: 700px; max-width: 80vw;"
      >
        <q-card-section>
          <div class="text-h6">Unenroll student</div>

          <q-form
              @submit="onSubmitUnenroll"
              class="q-gutter-md"
              >
               <div class="q-gutter-sm">
                 <q-option-group
                    :options="unenrollstudents"
                    type="checkbox"
                    v-model="groupIds"
                    keep-color
                    color="teal-10"

                  />
                <div>
                  <q-btn v-model="classid" label="Submit" type="submit" color="primary"/>
                </div>
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
const classid = ref(null)
const name = ref(null)
const description = ref(null)
const studentid = ref(null)

export default {

  data () {
    return {
      classes: [],
      students: [],
      unenrollstudents: [],
      groupIds: [],
      student_enroll: null,
      editModal: false,
      enrollModal: false,
      unenrollModal: false,
      editingIndex: null
    }
  },
  methods: {
    getClasses () {
      api.get('/classes')
        .then(response => {
          this.classes = response.data.data
        })
        .catch(error => console.log('Error', error.message))
    },
    addNew () {
      this.editModal = true
    },
    cancelAdd () {
      this.editModal = false
    },
    cancelEnroll () {
      this.enrollModal = false
    },
    enrollStudent (classId) {
      this.enrollModal = true
      classid.value = classId
      this.students = []
      api.get('/students?options=' + classId, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          this.students = response.data.data
        })
        .catch(error => console.log('Error' + error.message))
    },
    unenrollStudent (classId) {
      this.unenrollModal = true
      classid.value = classId

      api.get('/students?unenroll_class=' + classId, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          this.unenrollstudents = response.data.data
          // this.groupIds = response.data.groupIds
        })
        .catch(error => console.log('Error' + error.message))
    },
    onSubmit () {
      api.post('/classes', { name: name.value, description: description.value }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          console.log('response', response)
          this.editModal = false
          this.getClasses()
          this.successMessage(response)
        })
        .catch(error => this.errorMessage(error)
        )
    },
    enrollSubmit () {
      api.post('/enrollstudent', { classid: classid.value, studentid: studentid.value.value }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          if (response.data.success === 'false') {
            this.errorMessage(response.data)
          } else {
            this.enrollModal = false
            this.getClasses()
            this.onReset()
            this.successMessage(response)
          }
        })
        .catch(error => this.errorMessage(error)
        )
    },
    onSubmitUnenroll () {
      api.post('/unenrollstudent', { classid: classid.value, studentids: this.groupIds }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          this.unenrollModal = false
          this.getClasses()
          if (response.data.success === 'false') {
            this.errorMessage(response.data)
          } else {
            this.onReset()
            this.successMessage(response)
          }
        })
        .catch(error => this.errorMessage(error)
        )
    }
  },
  mounted () {
    this.getClasses()
  },

  setup () {
    const $q = useQuasar()

    return {
      name,
      description,
      studentid,
      classid,
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
        description.value = null
        studentid.value.value = null
      }

    }
  }
}
</script>
