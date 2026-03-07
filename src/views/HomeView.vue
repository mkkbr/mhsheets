<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 p-4">
    <!-- Header -->
    <header class="mb-1 text-center">
      <h1 class="text font-bold text-white">MH:W</h1>
    </header>

    <!-- Monster Selection Dropdown -->
    <div class="max-w-md mx-auto mb-4">
      <select
        id="monster-select"
        v-model="selectedMonsterId"
        @change="loadMonster"
        class="text-2xl w-full p-3 rounded-lg bg-gray-900 text-yellow-400 border border-gray-900 focus:ring-yellow-400"
      >
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
