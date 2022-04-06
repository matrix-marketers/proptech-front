<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Welcome"
      active
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from 'components/ExampleComponent.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components: { ExampleComponent }
})
</script>
