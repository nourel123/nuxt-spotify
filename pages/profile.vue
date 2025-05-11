<template>
  <div class="profile-container">
    <div v-if="user" class="profile-content">
      <h1 class="profile-name">{{ user.displayName }}</h1>
      <p class="profile-email">{{ user.email }}</p>

      <button class="logout-button" @click="logout">Log out</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const user = ref(null);
const router = useRouter();

onMounted(() => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    router.push('/login');
  } else {
    user.value = currentUser;
  }
});

function logout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      router.push('/login');
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
}
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
}

.profile-content {
  text-align: center;
  max-width: 600px;
  padding: 20px;
  background-color: #121212;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.profile-name {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.profile-email {
  font-size: 1rem;
  color: #b3b3b3;
  margin-bottom: 20px;
}

.logout-button {
  background-color: #1db954;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #1ed760;
}
</style>
