<template>
  <h1>тут типо красивая страничка с подробным описанием фильма, но мне лень стили делать, главное ведь научиться vue-router)))</h1>
  <p>{{movie.id}}</p>
  <p>{{movie.name}}</p>
  <p>{{ movie.rating  }}</p>
  <v-img cover height="550" v-if="(movie.poster && movie.poster.url) && movie.poster.url !== null"  :src="movie.poster.url"></v-img>
  <v-img cover height="550" v-else-if="movie.poster !== null"  :src="movie.poster"></v-img>
  <v-img cover height="550" v-else></v-img>
  <p>{{ movie.shortDescription  }}</p>
  <!-- <p>{{ movie.id }} </p> -->
  
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import * as KPiterfaces from '@openmoviedb/kinopoiskdev_client/dist/types.d';
import {useRoute} from 'vue-router';

export default defineComponent ({
  // props: {
  //   movies: Object,
  //   movieId: Number,
  // },
  data() {
    return {
      movie: {} as any,
      $route: {},
    }
  },
  created() {
    this.$route = this.$router.currentRoute;
    let moviesOnLoad: KPiterfaces.MovieDtoV13[] = [];

    const moviesData: string | null = localStorage.getItem("movies");
    moviesOnLoad = (moviesData !== null) ? JSON.parse(moviesData) : [];
    console.log(moviesOnLoad)

    this.movie = moviesOnLoad.filter(movie => String(movie.id) === this.$route.params.id)[0];
    console.log(this.movie)
  },

})
</script>

<style>

</style>