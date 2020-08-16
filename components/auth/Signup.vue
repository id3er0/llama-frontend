<template lang="pug">
  .sisu-page
    .form
      .form-error(
        v-for="(error, index) in errors"
        :key="index"
        v-if="error"
      ) {{error.message}}
      .form-group
        label.label(for="name") Name
        input#name.input(
          :class="{error: nameError}"
          v-model="name"
          autofocus
        )
      .form-group
        label.label(for="email") Email
        input#email.input(
          :class="{error: emailError}"
          v-model="email"
        )
      .form-group
        label.label(for="password") Password
        input#password.input(
          :class="{error: passwordError}"
          v-model="password"
          type="password"
        )
      .form-buttons.buttons
        button.button-wrapper
          span.button.button-primary.disabled(
            tabindex="-1"
            @click="createUser"
            :disabled="isDisabled"
          ) Sign Up
        button.button-wrapper
          nuxt-link.button.button-secondary(
            tabindex="-1"
            :to="{name: 'login'}"
          ) Log In
</template>


<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'Signup',
    async created() {
      console.log('xxx:', await this.$fireAuth.currentUser);
    },
    computed: {
      ...mapFields('signup', [
        'payload.name',
        'payload.email',
        'payload.password',
        'errors',
        'errors.nameError',
        'errors.emailError',
        'errors.passwordError',
      ]),
      ...mapGetters('signup', [
        'isDisabled',
      ]),
    },
    methods: {
      ...mapActions('signup', [
        'createUser',
      ]),
    },
    watch: {
      name() {
        this.nameError = null;
      },
      email() {
        this.emailError = null;
      },
      password() {
        this.passwordError = null;
      },
    },
  };
</script>
