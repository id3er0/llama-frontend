<template lang="pug">
  .modal-overlay(v-if="show")
    .modal
      img.modal-x(
        src="/images/x.svg"
        @click="show = false"
      )
      component(
        :is="show"
      )
</template>

<script>
  import TeamEdit from '~/components/modal/TeamEdit';
  import TeamInvite from '~/components/modal/TeamInvite';
  import PostEdit from '~/components/modal/PostEdit';
  import Post from '~/components/modal/Post';
  import PostRemove from '~/components/modal/PostRemove';
  import PasswordResetEmailSent from '~/components/modal/PasswordResetEmailSent';
  import UserNameUpdate from '~/components/modal/UserNameUpdate';
  import { mapFields } from 'vuex-map-fields';

  export default {
    components: {
      TeamEdit,
      TeamInvite,
      PostEdit,
      Post,
      PostRemove,
      PasswordResetEmailSent,
      UserNameUpdate,
    },
    mounted() {
      window.addEventListener('keydown', event => {
        // Escape
        if (event.keyCode === 27) {
          this.show = null;
        }
      });
    },
    computed: {
      ...mapFields('modal', [
        'show',
      ]),
    },
  };
</script>
