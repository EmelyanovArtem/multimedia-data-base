<template>
  <h1>{{ movieId }}</h1>
  <p>{{ movies }} </p>
  
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import * as KPiterfaces from '@openmoviedb/kinopoiskdev_client/dist/types.d';

export default defineComponent ({
  props: {
    movies: Array,
    movieId: Number,
  },
  data() {
    return {
      moviesA: this.movies
    }
  },
  methods: {
    movie: () => {
      return this.moviesA.find(movie => movie.id === this.movieId);
    }
  }
})
</script>

<style>

</style>