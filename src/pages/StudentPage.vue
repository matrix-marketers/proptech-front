<template>
  <q-page class="">
    <student-component
      title="Welcome to clases"
      active
    ></student-component>
  </q-page>
</template>

<script lang="ts">
import StudentComponent from 'components/StudentComponent.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'StudentPage',
  components: { StudentComponent }
})
</script>
