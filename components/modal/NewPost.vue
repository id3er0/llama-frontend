<template lang="pug">
  .post
    PostFormDropzone(v-if="!preview")
    PostFormPreviewLoading(v-else)
    PostFormText
    PostFormActions
</template>

<script>
  import PostFormDropzone from '~/components/post-form/Dropzone';
  import PostFormPreviewLoading from '~/components/post-form/PreviewLoading';
  import PostFormText from '~/components/post-form/Text';
  import PostFormActions from '~/components/post-form/Actions';
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'NewPost',
    components: {
      PostFormDropzone,
      PostFormPreviewLoading,
      PostFormText,
      PostFormActions,
    },
    computed: {
      ...mapFields('post-form', [
        'preview',
      ]),
    },
  };
</script>
