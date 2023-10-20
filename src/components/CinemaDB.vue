<template>
  <h1 class="mb-15">Поиск фильмов, сериалов, тв-шоу</h1>
  <v-text-field
    @input="title = $event.target.value"
    label="Название фильма"
  ></v-text-field>
  <v-btn @click="addMovies(title)" color="orange" class="mr-5"  prepend-icon="$vuetify"> Поиск </v-btn>
  <v-btn @click="removeMovies()" color="orange"  prepend-icon="$vuetify"> Очистить </v-btn>
  <router-view></router-view>
  <div class="card-container">
    <v-card
      class="mx-auto my-12 card"
      max-width="374"
      v-for="(movie, index) in movies"
      :key="index"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
<!--        111111111111111111111111111 -->
      <v-img cover height="550" v-if="(movie.poster && movie.poster.url) && movie.poster.url !== null"  :src="movie.poster.url"></v-img>
      <v-img cover height="550" v-else-if="movie.poster !== null"  :src="movie.poster"></v-img>
      <v-img cover height="550" v-else></v-img>

      <v-card-item>
        <v-card-title>{{ movie['name'] }}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">{{ movie['year'] }}</span>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating v-if="movie.rating !== undefined && ((movie.rating && movie.rating.kp) &&  movie.rating.kp !== null)"
          length="10"
          :model-value="movie.rating.kp"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
          ></v-rating>
          <v-rating v-else
          length="10"
          :model-value="movie.rating"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
          ></v-rating>

          <div v-if="(movie.rating && movie.rating.kp) && (movie.votes && movie.votes.kp)" class="text-grey ms-4">
            {{ movie.rating.kp }} ({{ movie.votes.kp }})
          </div>
          <div v-else class="text-grey ms-4">
            {{ movie.rating }} ({{ movie.votes }})
          </div>
        </v-row>

        <div v-if="(movie.countries && movie.countries[0] && movie.countries[0].name) && movie.countries.length > 0" class="my-4 text-subtitle-1">
          <span v-for="(country, index) in movie.countries" :key="index">
            • {{ country.name }}</span
          >, {{ movie.type }}
        </div>
        <div v-else class="my-4 text-subtitle-1">
          <span v-for="(country, index) in movie.countries" :key="index">
            • {{ country }}</span
          >, {{ movie.type }}
        </div>

        <div>{{ movie.shortDescription }}</div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>

      <v-card-title>Жанры</v-card-title>

      <div v-if="(movie.genres && movie.genres[0] && movie.genres[0].name) && movie.genres.length > 0" class="px-4">
        <v-chip-group >
          <v-chip @click="loadRendomFilms(genre.name)"  v-for="(genre, index) in movie.genres" :key="index">{{
            genre.name
          }}</v-chip>
        </v-chip-group>
      </div>
      <div v-else class="px-4">
        <v-chip-group >
          <v-chip @click="loadRendomFilms(genre)"  v-for="(genre, index) in movie.genres" :key="index">{{
            genre
          }}</v-chip>
        </v-chip-group>
      </div>
      <router-link :to="'/test/' + movie.id">Подробнее</router-link>
      <!-- <router-link :to="{ name: 'id', params: { username: movie.id }}">
        User
      </router-link> -->
      <!-- <router-view :movieId="movie.id"  :movies="movies"></router-view> -->
      <!-- <router-view></router-view> -->
    </v-card>
  </div>
</template>

<script lang="ts">
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#app {
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  text-align: left;
  min-width: 374px;
}
</style>
