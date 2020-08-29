<template lang="pug">
  div(style="display: flex; margin-top: 30px; justify-content: center;")
    .toggle-control(
      :class="{active: updatesOnly}"
      style="margin-right: 12px;"
      @click="updatesOnly = !updatesOnly"
    )
    .label-inline Show updates only
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'UpdatesOnlyToggle',
    computed: {
      ...mapFields('team', [
        'updatesOnly',
      ]),
    },
  };
</script>
