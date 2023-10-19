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
theme.global.name.value = JSON.parse(currentTheme);

function toggleTheme () {
  theme.global.name.value = theme.current.value.dark ? 'light' : 'dark'
  localStorage.setItem('theme', JSON.stringify(theme.global.name.value))
}

</script>
