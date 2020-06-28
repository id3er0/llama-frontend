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
        .human
          .owner-name-wrapper
            .name
              | Djordje Ungar
              .human-has-updates(style='background-color: #86fc3c;')
            img(src='/images/edit.svg')
          .posts-stream
            .post-thumb
              .post-thumb-add-button
                img(src='/images/plus.svg')
            .post-thumb
              .post-thumb-remove
                img(src='/images/x.svg')
              .post-thumb-image(style='background-image: url(https://source.unsplash.com/random?2);')
              .post-thumb-description
                | This wonderfull view I had when I visited Croatia with my team of
                | frontend and backend developers this autumn.
            .post-thumb
              .post-thumb-remove
                img(src='/images/x.svg')
              .post-thumb-image(style='background-image: url(https://source.unsplash.com/random?3);')
            .post-thumb
              .post-thumb-remove
                img(src='/images/x.svg')
              .post-thumb-image(style='background-image: url(https://source.unsplash.com/random?4);')
            .post-thumb
              .post-thumb-remove
                img(src='/images/x.svg')
              .post-thumb-image(style='background-image: url(https://source.unsplash.com/random?5);')
            .post-thumb
              .post-thumb-image(style='background-image: url(https://source.unsplash.com/random?6);')
              .post-thumb-more-button
                span +
                |             4
        .human
          .name
            | Keith Pope
            .human-has-updates(style='background-color: #fc9d3c;')
          .posts-stream
            .post-thumb
              .post-thumb-image(style='\
            background-image: url(https://source.unsplash.com/random?11);\
            ')
            .post-thumb
              .post-thumb-image(style='\
            background-image: url(https://source.unsplash.com/random?22);\
            ')
            .post-thumb
              .post-thumb-image(style='\
            background-image: url(https://source.unsplash.com/random?33);\
            ')
            .post-thumb
              .post-thumb-image(style='\
            background-image: url(https://source.unsplash.com/random?44);\
            ')
            .post-thumb
              .post-thumb-image(style='\
            background-image: url(https://source.unsplash.com/random?55);\
            ')
            .post-thumb
              .post-thumb-image(style='\
            background-image: url(https://source.unsplash.com/random?66);\
            ')
              .post-thumb-more-button +3
        .human
          .name
            | Micah Goulart
            .human-has-dot
          .posts-stream
            .post-thumb
              .post-thumb-image(style='\
            background-image: url(https://source.unsplash.com/random?40);\
            ')
            .post-thumb
              .post-thumb-image(style='\
            background-image: url(https://source.unsplash.com/random?42);\
            ')
            .post-thumb
              .post-thumb-image(style='\
            background-image: url(https://source.unsplash.com/random?43);\
            ')
            .post-thumb
              .post-thumb-image(style='\
            background-image: url(https://source.unsplash.com/random?44);\
            ')
            .post-thumb
              .post-thumb-image(style='\
            background-image: url(https://source.unsplash.com/random?45);\
            ')
            .post-thumb
              .post-thumb-image(style='\
            background-image: url(https://source.unsplash.com/random?46);\
            ')
              .post-thumb-more-button +22
        .human
          .name
            | Yury Molkin
            .human-has-dot
          .posts-stream
            .post-thumb
              .post-thumb-add-button +
            .post-thumb.post-thumb-empty
            .post-thumb.post-thumb-empty
            .post-thumb.post-thumb-empty
            .post-thumb.post-thumb-empty
            .post-thumb.post-thumb-empty
    .footer
      div llamaspace
      .button.button-simple Contact
</template>

<script>
  export default {
    components: {},
  };
</script>

<style lang="scss">
  @import '~/assets/styles/index';
</style>
