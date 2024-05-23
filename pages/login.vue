<template>
  <v-parallax class="paralax" src="/assets/fundoLogin.jpeg">
    <div class="login">
      <v-card class="cardLogin">
        <v-card-title>
          <div class="logoLogin">
            <v-img width="240px" src="/assets/devWeb.png"></v-img>
          </div>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="Email"
              prepend-icon="mdi-email"
              variant="solo"
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              prepend-icon="mdi-lock"
              variant="solo"
              type="password"
            ></v-text-field>
            <div class="sub">
              <v-btn class="sub" color="primary" @click="login" width="250px"
                >Login</v-btn
              >
            </div>
          </v-form>
          <div class="subnew">
            <v-btn
              color="primary"
              variant="text"
              @click="recuperaSenha"
              width="250px"
              >Esqueceu a senha</v-btn
            >
          </div>
          <v-divider
            :thickness="4"
            class="border-opacity-50 divider"
          ></v-divider>
          <div class="subnew">
            <v-btn color="error" size="x-large" @click="newConta" width="250px"
              >Criar uma conta</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-parallax>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
definePageMeta({
  layout: false,
});

const router = useRouter();
const email = ref("");
const password = ref("");

const login = () => {
  console.log(email.value + " " + password.value);
  router.push("/produto");
};

const recuperaSenha = () => {
  console.log(email.value + " " + password.value);
};

const newConta = () => {
  console.log(email.value + " " + password.value);
};
</script>

<style scoped>
.paralax {
  height: 100vh;
  display: fixed;
}

.login {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.cardLogin {
  width: 450px;
  height: 600px;
  background: rgb(255, 187, 0);
}

.logoLogin {
  width: 100%;
  height: 80px;
  margin: 30px 0 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sub {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.subnew {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.divider {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
