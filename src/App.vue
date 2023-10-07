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

if(theme.global.name.value) {
  theme.global.name.value = JSON.parse(localStorage.getItem('theme'));
}

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  localStorage.setItem('theme', JSON.stringify(theme.global.name.value))
}
</script>
