<template>
  <div>
    <h1>PRODUTO</h1>
    <v-btn type="button" @click="helloWorld">Hello</v-btn>
    <label class="ma-4">{{ testeAPI }}</label>
    <!-- {{ testeAPI }} -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const testeAPI = ref<string>("");

const helloWorld = async () => {
  const { data } = await axios.get("/api/hello");
  console.log(data);
  testeAPI.value = data.hello ?? "";
};
</script>
