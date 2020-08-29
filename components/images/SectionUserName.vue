<template lang="pug">
  .name(v-if="user")
    template(v-if="user.profile && user.profile.displayName") {{user.profile.displayName}}
    template(v-else) [No user name]
    .human-has-updates(
      v-if="user.hasUpdates"
      :style="{'background-color': user.hasUpdates}"
    )
    .human-has-dot(
      v-if="user.hasDot"
    )
</template>

<script>
  export default {
    name: 'SectionUserName',
    props: {
      user: Object,
    },
  };
</script>
