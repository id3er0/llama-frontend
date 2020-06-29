<template lang="pug">
  textarea.textarea.description-textarea(
    placeholder='Description'
    v-model="text"
    rows='3'
  )
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'PostFormText',
    computed: {
      ...mapFields('post-form', [
        'text',
      ]),
    },
  };
</script>
