<template>
  
  <router-view></router-view>
  
</template>

<!-- <script lang="ts">
import {
  KinopoiskDev,
  MovieQueryBuilder,
} from "@openmoviedb/kinopoiskdev_client";
import * as KPiterfaces from '@openmoviedb/kinopoiskdev_client/dist/types.d';
import { defineProps, defineEmits, defineComponent } from 'vue';
import {Movie, MovieArray} from '../interfaces/movieInterface.dot';

const kp = new KinopoiskDev(import.meta.env.VITE_KINOPOISK_KEY);
// console.log(moviesOnLoad[0].countries);

export default defineComponent({
  created() {
    let moviesOnLoad: KPiterfaces.MovieDtoV13[] = [];

    const moviesData: string | null = localStorage.getItem("movies");
    moviesOnLoad = (moviesData !== null) ? JSON.parse(moviesData) : [];

    this.movies = moviesOnLoad;
  },
  data() {
    return {
      title: '' as String,
      movies: [] as any,
    };
  },
  methods: {
    async addMovies(title: string) {
      const queryBuilder = new MovieQueryBuilder();
      const query = queryBuilder
        .query(title)
        // Добавляем пагинацию и получаем 1 страницу по с 10 фильмами на странице
        .paginate(1, 50)
        // Собираем запрос
        .build();

      const { data, error, message } = await kp.movie.getBySearchQuery(query);
      // console.log(data, error, message);

      this.movies = [];

      if (data !== null && data !== undefined) {
        const dataDocs: KPiterfaces.MeiliMovieEntity[] = data.docs as KPiterfaces.MeiliMovieEntity[];
        dataDocs.forEach((e) => {
          this.movies.push(e);
        });
      }
      
      localStorage.setItem("movies", JSON.stringify(this.movies));
      // console.log(this.movies);
    },

    removeMovies() {
      this.movies = [];
      localStorage.setItem("movies", JSON.stringify(this.movies));
    },

    async loadRendomFilms(genre: string | number | boolean) {
      // console.log(genre);
      // Создаем билдер запросов для фильмов
      const queryBuilder = new MovieQueryBuilder();

      // Выбираем поля, которые мы хотим получить в ответе
      const baseQuery = queryBuilder
      // .select(['id', 'name', 'rating.kp', 'poster.url', 'year', 'genres.name', 'votes', 'countries.name', 'type', 'shortDescription'])
        // Добавляем фильтр для поиска фильмов с постером
        .filterExact('genres.name', genre)
      const query = baseQuery
        // получим первую страницу, чтобы узнать сколько всего фильмов удовлетворяет нашим фильтрам
        .paginate(1, 50)
        // Собираем запрос
        .build();
      const {data, error, message} = await kp.movie.getByFilters(query);

      this.movies = [];

      if (data !== null && data !== undefined) {
        const dataDocs: KPiterfaces.MovieDtoV13[] = data.docs as KPiterfaces.MovieDtoV13[];
        dataDocs.forEach((e) => {
          this.movies.push(e);
        });
      }
      // console.log(this.movies);
      localStorage.setItem("movies", JSON.stringify(this.movies));
    }
  },
});
</script> -->

<script lang="ts">
import { defineProps, defineEmits, defineComponent } from 'vue';
import MovieCard from './MovieCard.vue';

export default defineComponent({
  components: {
    MovieCard
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
