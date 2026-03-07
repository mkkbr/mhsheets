<template>
  <!-- Monster Selection Grid (shown if no monster is selected) -->
  <div v-if="!selectedMonster" class="max-w-md mx-auto mb-4">
    <div class="grid grid-cols-2 gap-2">
      <div
        v-for="monster in monsters"
        :key="monster.id"
        @click="selectMonster(monster.id)"
        class="flex items-center gap-2 p-2 rounded-lg bg-gray-900 text-yellow-400 border border-gray-700 hover:bg-gray-800 cursor-pointer"
      >
        <img
          :src="`/icons/${monster.icon}`"
          alt="Monster Icon"
          class="w-8 h-8 object-contain"
        />
        <span>{{ monster.name }}</span>
      </div>
    </div>
  </div>

  <!-- Selected Monster Display (shown if a monster is selected) -->
  <div v-else class="max-w-2xl mx-auto">
    <MonsterCard :monster="selectedMonster" />
  </div>
</template>

<script setup>
// Your existing logic for `monsters`, `selectedMonster`, and `selectMonster`
</script>
