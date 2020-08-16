<template lang="pug">
  .sisu-page
    .form
      .form-error(
        v-for="(error, index) in errors"
        :key="index"
        v-if="error"
      ) {{error.message}}
      .form-group
        label.label(for="email") Email
        input#email.input(
          :class="{error: emailError}"
          v-model="email"
          autocomplete="off"
          spellcheck="false"
          autofocus
        )
      .form-group
        label.label(for="name") Password
        .input-wrapper
          input#name.input(
            :class="{error: passwordError}"
            v-model="password"
            type="password"
            autocomplete="off"
            spellcheck="false"
            style="width: 100%"
          )
          button.email-me-button(
            type="button"
            @click="emailPassword"
            :disabled="!isEmail"
          )
            img(src="/images/mail.svg")
            span email me
      .form-buttons.buttons
        button.button-wrapper
          nuxt-link.button.button-secondary(
            tabindex="-1"
            :to="{name: 'signup'}"
          ) Sign Up
        button.button-wrapper
          span.button.button-primary(
            tabindex="-1"
            @click="signIn"
            :disabled="isDisabled"
          ) Log In
</template>


<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Login',
    computed: {
      ...mapFields('login', [
        'payload.email',
        'payload.password',
        'errors',
        'errors.emailError',
        'errors.passwordError',
      ]),
      ...mapGetters('login', [
        'isEmail',
        'isDisabled',
      ]),
    },
    methods: {
      ...mapActions('login', [
        'emailPassword',
        'signIn',
      ]),
    },
    watch: {
      email() {
        this.emailError = null;
      },
      password() {
        this.passwordError = null;
      },
    },
  };
</script>
