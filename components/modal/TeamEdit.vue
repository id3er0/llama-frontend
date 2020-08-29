<template lang="pug">
  .new-team.form
    .modal-title(v-if="team") Edit Team
    .modal-title(v-else) Create Team
    .form-group
      label.label(for='name') Name
      input.input#name(
        v-model="name"
        autofocus
      )
    .form-group
      .label Logo
      .team-logo-form-row
        .team-logo-form-preview(
          v-if="preview"
          :style="{'background-image': `url(${preview})`}"
        )
        label.button-wrapper
          input.input-hidden(
            type="file"
            :multiple="false"
            accept="image/jpeg"
            @change="uploadFile($event.target.files)"
          )
          span.button.button-secondary.button-white(tabindex="-1") Select Image
    .form-buttons.buttons
      .button-wrapper
        button.button.button-secondary(
          type="button"
          tabindex="-1"
          @click="show = null"
        ) Cancel
      .button-wrapper
        button.button.button-primary(
          type="button"
          :class="{busy}"
          tabindex="-1"
          :disabled="!name || busy"
          @click="upsert"
        ) Save
</template>

<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapActions } from 'vuex';
  import objectValue from '~/utils/objectValue';

  export default {
    name: 'TeamEdit',
    created() {
      if (this.team) {
        this.name = objectValue(this, 'team.name', null);
        this.preview = objectValue(this, 'team.image.url', null);
        this.image = objectValue(this, 'team.image', null);
      }
    },
    computed: {
      ...mapFields('loading', [
        'loading',
      ]),
      ...mapFields('team', [
        'team',
      ]),
      ...mapFields('team-form', [
        'name',
        'preview',
        'image',
      ]),
      ...mapFields('modal', [
        'show',
      ]),
      busy() {
        return this.loading['team-image-upload']
          || this.loading['team-new']
          || this.loading['team-update'];
      },
    },
    methods: {
      ...mapActions('team-form', [
        'uploadFile',
        'update',
        'create',
      ]),
      upsert() {
        this.team ? this.update() : this.create();
      },
    },
  };
</script>
