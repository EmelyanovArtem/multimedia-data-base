<template>
  <v-app>
    <v-main>
      <v-btn color="orange" @click="toggleTheme()" class="mt-10 mb-10">Сменить цветовую тему</v-btn>
      <CinemaDB/>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import CinemaDB from '@/components/CinemaDB.vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

let currentTheme = localStorage.getItem('theme') ?? 'light';
theme.global.name.value = currentTheme;

function toggleTheme () {
  // работает, оно добавляло лишние кавычки, поэтому тема нормально не распознавалась, база
  // всё, понял. Ну, туплю по жести иногда
  theme.global.name.value = theme.current.value.dark ? 'light' : 'dark'
  localStorage.setItem('theme', theme.global.name.value)
}

</script>
