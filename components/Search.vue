<template lang="pug">
  .input-wrapper.input-search-wrapper
    img(src="/images/magnifying_glass.svg")
    input.input.input-search(
      v-model="search"
      autocomplete="off"
      spellcheck="false"
      placeholder="Search"
    )
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'Search',
    computed: {
      ...mapFields('team', [
        'search',
      ]),
    },
  };
</script>
