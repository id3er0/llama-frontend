<template lang="pug">
  label.post-image-dropzone(
    :class="{active: dragOver}"
    @dragleave="fileDragOut"
    @dragover="fileDragIn"
    @drop="handleFileDrop"
  )
    input.input(
      type="file"
      :multiple="false"
      accept="image/jpeg"
      @change="handleFileInput"
    )
    img(ref="preview")
    div Drag and Drop
    div or
    div.button-wrapper.post-image-select-file
      span.button.button-secondary.button-white(
        tabindex="-1"
      ) Select Image
</template>

<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapActions } from 'vuex';

  export default {
    name: 'PostFormDropzone',
    data: () => ({
      files: [],
      dragOver: false,
    }),
    computed: {
      ...mapFields('post-form', [
        'preview',
      ]),
    },
    methods: {
      ...mapActions('post-form', [
        'uploadFile',
      ]),
      handleFileDrop(event) {
        let files = event.dataTransfer.files;
        console.log('xxx handleFileDrop - files:', files);
        if (!files) {
          return;
        }
        this.uploadFile(files);
        this.dragOver = true;
      },
      handleFileInput(event) {
        let files = event.target.files;
        files = event.target.files;
        if (!files) {
          return;
        }
        this.uploadFile(files);
      },
      fileDragIn() {
        this.dragOver = true;
      },
      fileDragOut() {
        this.dragOver = false;
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
