<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <div class="logo">
          <v-img width="140px" src="/assets/devWeb.png"></v-img>
        </div>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
      >
        <v-list density="compact">
          <v-list-subheader>MENU</v-list-subheader>

          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            :to="item.link"
            color="primary"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

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
    title: "Usuários",
    value: "usuario",
    icon: "mdi-account",
    link: "/usuario",
  },
  {
    title: "Produtos",
    value: "produto",
    icon: "mdi-package-variant-closed",
    link: "/produto",
  },
  {
    title: "Categorias",
    value: "categoria",
    icon: "mdi-tag",
    link: "/categoria",
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
