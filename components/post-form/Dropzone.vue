<template lang="pug">
  label.post-image-dropzone.active
    input.input(
      type="file"
      :multiple="false"
      accept="image/jpeg"
      @change="upload($event.target.files)"
    )
    img(ref="preview")
    div Drag and Drop
    div or
    div.button-wrapper.post-image-select-file
      span.button.button-secondary.button-white(tabindex='-1') Select Image
</template>

<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapActions } from 'vuex';

  export default {
    name: 'PostFormDropzone',
    computed: {
      ...mapFields('post-form', [
        'file',
        'preview',
      ]),
    },
    methods: {
      ...mapActions('post-form', [
        'uploadFile'
      ]),
      upload(file) {
        this.file = file[0];
        this.preview = URL.createObjectURL(this.file);
        this.uploadFile();

        // const reader = new FileReader();
        // reader.onload = event => {
        //   // get loaded data and render thumbnail.
        //   this.$refs.preview.src = event.target.result;
        // };
        // // read the image file as a data URL.
        // reader.readAsDataURL(this.file);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .input {
    position: absolute;
    pointer-events: none;
    opacity: 0;
  }
</style>
