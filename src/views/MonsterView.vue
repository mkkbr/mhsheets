<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 p-4">
    <!-- Header -->
    <header  @click="openGrid"  class="pb-4 flex items-center justify-center relative place-content-center max-w-3xl mx-auto">
        <button class="text-white hover:text-yellow-300 flex items-center gap-1 absolute left-0">
        <i class="fa-solid fa-angles-left"></i>
      </button>
      <h1 class="text-2xl font-bold text-white hover:text-yellow-300">Monster Hunter Wilds</h1>
    </header>

    <!-- Selected Monster Display -->
    <div v-if="monster" class="max-w-2xl mx-auto">
      <MonsterCard :monster="monster" />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter  } from 'vue-router';
import MonsterCard from '../components/MonsterCard.vue';

const route = useRoute();
const router = useRouter();
const monster = ref(null);
const monsters = ref([]);

// Load all monsters
const loadMonsters = async () => {
  const response = await fetch('./data/wilds_monsters.json');
  monsters.value = await response.json();
};

// Find monster by name from route
const loadMonster = () => {
  const monsterName = route.params.monsterName;
  monster.value = monsters.value.find(m =>
    m.name.toLowerCase() === monsterName.toLowerCase()
  );
};

// Navigate to grid
const openGrid = () => {
  router.push('/'); // Navigate to base URL
};

onMounted(async () => {
  await loadMonsters();
  loadMonster();
});

// Update if route changes
watch(() => route.params.monsterName, loadMonster);
</script>
