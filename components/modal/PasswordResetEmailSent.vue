<template lang="pug">
  .alert
    .modal-title Email Sent
    .modal-description
      | We sent an email to {{email}} with a temporary password.
</template>

<script>
  import PostFormDropzone from '~/components/post-form/Dropzone';
  import PostFormPreviewLoading from '~/components/post-form/PreviewLoading';
  import PostFormText from '~/components/post-form/Text';
  import PostFormActions from '~/components/post-form/Actions';
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'PasswordResetEmailSent',
    components: {
      PostFormDropzone,
      PostFormPreviewLoading,
      PostFormText,
      PostFormActions,
    },
    computed: {
      ...mapFields('login', [
        'payload.email',
      ]),
    },
  };
</script>
