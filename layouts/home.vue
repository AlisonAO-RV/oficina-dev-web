<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <div class="logo">
          <v-img width="140px" src="/assets/devWeb.png"></v-img>
        </div>

        <v-spacer></v-spacer>
        <template v-if="$vuetify.display.mdAndUp">
          <v-btn variant="text" to="/login">Login</v-btn>

          <v-btn variant="text" to="/produto">Sobre</v-btn>
        </template>
        <!-- <v-spacer></v-spacer> -->

        <v-btn icon="mdi-account" variant="text"></v-btn>
      </v-app-bar>

      <v-main>
        <div class="main">
          <slot />
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref, watch } from "vue";

const items = [
  {
    title: "Home",
    value: "home",
    icon: "mdi-home",
    link: "/",
  },
  {
    title: "Cadastro de Usuários",
    value: "cadastroUsuario",
    icon: "mdi-account",
    link: "/login",
  },
  {
    title: "Cadastro de Produtos",
    value: "cadastroProduto",
    icon: "mdi-package-variant-closed",
    link: "/login",
  },
  {
    title: "Cadastro de Categorias",
    value: "cadastroCategoria",
    icon: "mdi-tag",
    link: "/login",
  },
];

const drawer = ref(true);
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
}

.main {
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
}
</style>
