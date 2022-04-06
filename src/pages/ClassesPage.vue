<template>
  <q-page class="">
    <clases-component
      title="Welcome to clases"
      active
    ></clases-component>
  </q-page>
</template>

<script lang="ts">
import ClasesComponent from 'components/ClasesComponent.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ClasesPage',
  components: { ClasesComponent }
})
</script>
