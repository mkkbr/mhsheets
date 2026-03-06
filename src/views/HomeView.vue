<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
    <!-- Header -->
    <header class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-yellow-400 mb-2">Cheatsheet</h1>
    </header>

    <!-- Monster Selection Dropdown -->
    <div class="max-w-md mx-auto mb-8">
      <select
        id="monster-select"
        v-model="selectedMonsterId"
        @change="loadMonster"
        class="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-yellow-400"
      >
        <option value="" disabled>Choose a monster</option>
        <option v-for="monster in monsters" :key="monster.id" :value="monster.id">
          {{ monster.name }}
        </option>
      </select>
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
    const response = await fetch('/data/wilds_monsters.json');
    monsters.value = await response.json();
  } catch (error) {
    console.error('Error loading monsters:', error);
  }
});

// Load selected monster
const loadMonster = () => {
  selectedMonster.value = monsters.value.find(
    (monster) => monster.id === parseInt(selectedMonsterId.value)
  );
};
</script>
