<template lang="pug">
  .human
    .owner-name-wrapper
      .name
        | Djordje Ungar
        .human-has-updates(style='background-color: #86fc3c;')
      img(src='/images/edit.svg')
    //
      .name
        | Keith Pope
        .human-has-updates(style='background-color: #fc9d3c;')
      .name
        | Yury Molkin
        .human-has-dot
    .posts-stream
      ImagesAdd
      .post-thumb(
        v-for="(item, index) in items"
        @click="show(item.id)"
      )
        .post-thumb-image(:style="{'background-image': `url(${item.imageUrl})`}")
          .post-thumb-description(
            v-if="item.text"
          )
            | {{item.text}}
      //
        .post-thumb.post-thumb-empty
        .post-thumb
          .post-thumb-image(:style="{'background-image': 'url(${item.image})'}")
        .post-thumb
          .post-thumb-image(:style="{'background-image': 'url(${item.image})'}")
          .post-thumb-more-button +22
</template>

<script>
  import ImagesAdd from '~/components/images/Add';
  import { mapFields } from 'vuex-map-fields';
  import { mapActions } from 'vuex';

  export default {
    name: 'Section',
    components: {ImagesAdd},
    created() {
      this.load();
    },
    computed: {
      ...mapFields('posts', [
        'items',
      ]),
    },
    methods: {
      ...mapActions('posts', [
        'load',
        'show',
      ]),
    }
  };
</script>
