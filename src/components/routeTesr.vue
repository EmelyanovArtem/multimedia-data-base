<template>
  <h1>{{ movieId }}</h1>
  <h1>test</h1>
  <!-- <p>{{ movie.id }} </p> -->
  
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import * as KPiterfaces from '@openmoviedb/kinopoiskdev_client/dist/types.d';

export default defineComponent ({
  props: {
    movies: Array,
    movieId: Number,
  },
  // methods: {
  //   movie: () => {
  //     return this.movies.find(movie => movie.id === this.movieId);
  //   }
  // }
})
</script>

<style>

</style>