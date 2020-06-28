<template lang="pug">
  .b-modal(v-if="show")
    .b-modal__outline(
      @click="show = false"
    )
    component(
      :is="show"
    )
</template>

<script>
  // import Example from '~/components/modals/Example';
  import { mapFields } from 'vuex-map-fields';

  export default {
    components: {
      // Example,
    },
    computed: {
      ...mapFields('modal', [
        'show',
      ]),
    },
  };
</script>
