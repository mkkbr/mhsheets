<template>
  <div class="min-h-screen p-4 bg-ctp-crust text-ctp-teal">
    <!-- Header -->
    <header  @click="openGrid"  class="pb-2 flex items-center justify-center relative max-w-3xl mx-auto">
        <button class="hover:text-ctp-yellow text-2xl flex items-center gap-1 absolute left-0">
        <i class="fa-solid fa-angles-left"></i>
      </button>
      <h1 class="text-2xl hover:text-ctp-yellow">Monster Hunter Wilds</h1>
    </header>

    <!-- Selected Monster Display -->
    <div v-if="monster" class="max-w-lg mx-auto mb-4 md:max-w-3xl">
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
  monster.value = monsters.value.find(m => m.defname === monsterName);
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
