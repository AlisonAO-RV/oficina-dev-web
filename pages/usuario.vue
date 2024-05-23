<template>
  <div>
    <h1>USUÁRIO</h1>

    <div v-if="users && users.length > 0">
      <ul>
        <li v-for="user in users" :key="user.email">
          <img :src="user.photoUrl" :alt="user.name" width="50" />
          <div>
            <p>{{ user.name }}</p>
            <p>{{ user.email }}</p>
            <p>{{ user.status }}</p>
            <button @click="editUser(user)">Editar</button>
            <button @click="deleteUser(user.id)">Deletar</button>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Carregando usuários...</p>
    </div>

    <h2>{{ isEditing ? "Editar Usuário" : "Adicionar Usuário" }}</h2>
    <form @submit.prevent="isEditing ? updateUser() : addUser()">
      <input v-model="form.name" placeholder="Nome" required />
      <input v-model="form.email" placeholder="Email" required />
      <input v-model="form.photoUrl" placeholder="URL da Foto" required />
      <select v-model="form.status" required>
        <option value="active">Ativo</option>
        <option value="inactive">Inativo</option>
      </select>
      <button type="submit">{{ isEditing ? "Atualizar" : "Adicionar" }}</button>
      <button type="button" @click="cancelEdit">Cancelar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface User {
  id?: number;
  name: string;
  email: string;
  photoUrl: string;
  status: string;
}

type Users = User[];

const users = ref<Users>([] as Users);
const form = ref<User>({ name: "", email: "", photoUrl: "", status: "active" });
const isEditing = ref(false);
const currentUserId = ref<number | null>(null);

const loadUsers = async () => {
  const { data } = await axios.get("/api/usuario");
  users.value = data.users ?? [];
};

const addUser = async () => {
  const { data } = await axios.post("/api/usuario", form.value);
  users.value.push(data.user);
  resetForm();
};

const editUser = (user: User) => {
  form.value = { ...user };
  isEditing.value = true;
  currentUserId.value = user.id ?? null;
};

const updateUser = async () => {
  if (currentUserId.value !== null) {
    const { data } = await axios.put(
      `/api/usuario?id=${currentUserId.value}`,
      form.value
    );
    const index = users.value.findIndex(
      (user) => user.id === currentUserId.value
    );
    if (index !== -1) {
      users.value[index] = data.user;
    }
    resetForm();
  }
};

const deleteUser = async (id: number | undefined) => {
  await axios.delete(`/api/usuario?id=${id}`);
  users.value = users.value.filter((user) => user.id !== id);
};

const resetForm = () => {
  form.value = { name: "", email: "", photoUrl: "", status: "active" };
  isEditing.value = false;
  currentUserId.value = null;
};

const cancelEdit = () => {
  resetForm();
};

onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

img {
  margin-right: 10px;
}
</style>
