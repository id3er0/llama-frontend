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
        .button-wrapper
          nuxt-link.button.button-secondary(
            tabindex="-1"
            :to="{name: 'signup'}"
          ) Sign Up
        .button-wrapper
          button.button.button-primary(
            :class="{busy: loading['signin']}"
            tabindex="-1"
            :disabled="isDisabled || loading['signin']"
            @click="signIn"
          ) Log In
</template>


<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapGetters, mapActions } from 'vuex';
  import InviteBlock from '~/components/auth/InviteBlock';

  export default {
    name: 'Login',
    components: {InviteBlock},
    computed: {
      ...mapFields('loading', [
        'loading',
      ]),
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
