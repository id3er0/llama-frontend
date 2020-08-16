<template lang="pug">
  div
    div
      .sticky-bar
        .owner-name-wrapper.team-owner-name-wrapper
          .team-logo(style='background-image: url(https://source.unsplash.com/random?100);')
          .team-name Teamname
          img(src='/images/edit.svg')
        .sticky-bar-buttons.buttons
          button.button-wrapper
            span.button.button-secondary.button-white(tabindex='-1') Log out
          button.button-wrapper
            span.button.button-hollow(tabindex='-1', style='width: 60px;') Invite
      .directory
        .input-wrapper.input-search-wrapper
          img(src='/images/magnifying_glass.svg')
          input#email.input.input-search(type='text', autocomplete='off', spellcheck='false', placeholder='Search')
        div(style='display: flex; margin-top: 30px; justify-content: center;')
          .toggle-control(style='margin-right: 12px;')
          .label-inline Show updates only
        Section
    .footer
      div llamaspace
      .button.button-simple Contact
</template>

<script>
  import Section from '~/components/images/Section';
  export default {
    components: {Section},
  };
</script>
