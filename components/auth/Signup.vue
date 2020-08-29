<template lang="pug">
  .sisu-page
    .form
      InviteBlock
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
        .button-wrapper
          button.button.button-primary.disabled(
            :class="{busy: loading['create-user']}"
            tabindex="-1"
            @click="createUser"
            :disabled="isDisabled || loading['create-user']"
          ) Sign Up
        .button-wrapper
          nuxt-link.button.button-secondary(
            tabindex="-1"
            :to="{name: 'login'}"
          ) Log In
</template>


<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapActions, mapGetters } from 'vuex';
  import InviteBlock from '~/components/auth/InviteBlock';

  export default {
    name: 'Signup',
    components: {InviteBlock},
    computed: {
      ...mapFields('loading', [
        'loading',
      ]),
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
