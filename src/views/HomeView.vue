<template>
  <div class="min-h-screen bg-gray-900 text-gray-400 p-4">
    <!-- Header -->
    <header class="pb-4 flex items-center justify-center relative max-w-3xl mx-auto">
      <h1 @click="$router.push('/')" class="text-2xl fira-sans">
        Monster Hunter Wilds
      </h1>
    </header>

    <!-- Monster Grid -->
    <div v-if="!$route.params.monsterName" class="max-w-lg mx-auto mb-4 lg:max-w-3xl">
      <div class="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <div v-for="monster in monsters" :key="monster.id" @click="$router.push(`/${monster.defname}`)"
          class="flex flex-col items-center gap-2 p-2 rounded-md text-yellow-400 border border-gray-700 hover:bg-gray-800 cursor-pointer">
          <span class="text-lg fira-sans-cd">{{ monster.name }}</span>
          <img :src="monster.image" :alt="monster.name" class="object-contain object-center w-60"
            @error="$event.target.src = '/images/icons/starx.png'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MonsterCard from '../components/MonsterCard.vue';

const route = useRoute();
const router = useRouter();
const monsters = ref([]);
const selectedMonster = ref(null);

// Load all monsters
onMounted(async () => {
  try {
    const response = await fetch('./data/wilds_monsters.json');
    monsters.value = await response.json();
    loadMonster();
  } catch (error) {
    console.error('Error loading monsters:', error);
  }
});

// Load monster based on route
const loadMonster = () => {
  const monsterName = route.params.monsterName;
  if (monsterName) {
    selectedMonster.value = monsters.value.find(
      (monster) => monster.defname === monsterName
    );
  } else {
    selectedMonster.value = null;
  }
};

watch(() => route.params.monsterName, loadMonster);
</script>
