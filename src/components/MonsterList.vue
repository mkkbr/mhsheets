<script setup>
import { ref, computed, onMounted } from 'vue';
import MonsterCard from './MonsterCard.vue';

const monsters = ref([]);
const searchQuery = ref('');
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('/data/wilds_monsters.json');
    if (!response.ok) throw new Error('Failed to fetch monsters');
    monsters.value = await response.json();
  } catch (err) {
    error.value = err.message;
    console.error('Error loading monsters:', err);
  } finally {
    loading.value = false;
  }
});

const filteredMonsters = computed(() => {
  if (!searchQuery.value) return monsters.value;
  return monsters.value.filter(monster =>
    monster.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div>
    <!-- Search Bar -->
    <div class="max-w-md mx-auto mb-8">
      <input v-model="searchQuery" type="text" placeholder="Search monsters..."
             class="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-yellow-400" />
    </div>

    <!-- Loading/Error States -->
    <div v-if="loading" class="text-center py-8">Loading monsters...</div>
    <div v-else-if="error" class="text-center py-8 text-red-400">
      Error: {{ error }}. Check the console for details.
    </div>

    <!-- Monster Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <MonsterCard v-for="monster in filteredMonsters" :key="monster.id" :monster="monster" />
    </div>
  </div>
</template>
