<template>
  <h1>тут типо красивая страничка с подробным описанием фильма, но мне лень стили делать, главное ведь научиться vue-router)))</h1>
  <p>{{movie.id}}</p>
  <p>{{movie.name}}</p>
  <p>{{ movie.rating  }}</p>
  <v-img cover height="550" v-if="(movie.poster && movie.poster.url) && movie.poster.url !== null"  :src="movie.poster.url"></v-img>
  <v-img cover height="550" v-else-if="movie.poster !== null"  :src="(movie.poster as string)"></v-img>
  <v-img cover height="550" v-else></v-img>
  <p>{{ movie.shortDescription  }}</p>
  <!-- <p>{{ movie.id }} </p> -->
  
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import * as KPiterfaces from '@openmoviedb/kinopoiskdev_client/dist/types.d';
import { ref } from 'vue';

export default defineComponent ({
  // props: {
  //   movies: Object,
  //   movieId: Number,
  // },
  data() {
    const movie = ref({} as KPiterfaces.MovieDtoV13)
    
    let moviesOnLoad: KPiterfaces.MovieDtoV13[] = [];

    const moviesData: string | null = localStorage.getItem("movies");
    moviesOnLoad = (moviesData !== null) ? JSON.parse(moviesData) : [];
    console.log(moviesOnLoad)
// оке, проочту
    movie.value = moviesOnLoad.filter(movie => String(movie.id) === this.$route.params.id)[0];
//  ну типо работает
//  Это пиздец, магия. Я потом детально посмотрю, что ты написал
// Ну ок давай, я тогда пойду, надо если что уже начинать делать
// сек!! Что значит ref?
// ну лан давай, я тогда пошёл, не затягивай, удачи))
// Хорошо, спасибо
    return {
      movie
    }
  },
})
</script>

<style>

</style>