<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 p-4">
    <!-- Header -->
    <header class="pb-4 flex items-center justify-center relative">
      <button v-if="selectedMonster" @click="selectedMonster = null"
        class="text-white hover:text-yellow-300 flex items-center gap-1 absolute left-0">
        <i class="fa-solid fa-grip-vertical"></i>
      </button>
      <h1 class="text-2xl font-bold text-white">Monster Hunter Wilds</h1>
    </header>

    <div v-if="!selectedMonster" class="max-w-md mx-auto mb-4">
      <div class="grid grid-cols-2 gap-2">
        <div v-for="monster in monsters" :key="monster.id" @click="selectMonster(monster.id)"
          class="flex flex-col items-center gap-2 p-2 rounded-lg bg-gray-900 text-yellow-400 border border-gray-700 hover:bg-gray-800 cursor-pointer">
          <span>{{ monster.name }}</span>
          <img :src="monster.image" :alt="monster.name" class="object-contain object-center w-60"
            @error="$event.target.src = '/images/icons/starx.png'" />
        </div>
      </div>
    </div>

    <!-- Selected Monster Display -->
    <div v-if="selectedMonster" class="max-w-2xl mx-auto">
      <MonsterCard :monster="selectedMonster" />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MonsterCard from '../components/MonsterCard.vue';

const monsters = ref([]);
const selectedMonsterId = ref(null);
const selectedMonster = ref(null);

// Load all monsters (for dropdown)
onMounted(async () => {
  try {
    const response = await fetch('./data/wilds_monsters.json');
    monsters.value = await response.json();
  } catch (error) {
    console.error('Error loading monsters:', error);
  }
});

// Select a monster and load its details
const selectMonster = (id) => {
  selectedMonsterId.value = id;
  loadMonster();
};
// Load selected monster
const loadMonster = () => {
  selectedMonster.value = monsters.value.find(
    (monster) => monster.id === parseInt(selectedMonsterId.value)
  );
};
</script>
