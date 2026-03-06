<template>
  <div class="bg-black rounded-lg p-4 shadow-lg max-w-md mx-auto">
    <!-- Monster Name -->
    <h2 class="text-2xl font-bold text-white mb-4 text-center">{{ monster.name }}</h2>

    <!-- Monster Image and Weaknesses -->
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Monster Image -->
      <div class="flex-shrink-0 w-full md:w-48 h-48 bg-gray-800 rounded-lg flex items-center justify-center">
        <img
          :src="monster.image"
          :alt="monster.name"
          class="w-full max-w-[400px] h-auto object-contain mx-auto"
          @error="$event.target.src = '/images/icons/monster_placeholder.png'"
        />
      </div>

      <!-- Weaknesses Grid -->
      <div class="flex-1 grid grid-cols-2 gap-2">
        <!-- Elemental Weaknesses -->
        <div>
          <div v-for="(value, element) in monster.elements" :key="element" class="flex items-center mb-1">
            <img
              :src="`/images/icons/${element}.png`"
              :alt="element"
              class="w-6 h-6 mr-2"
            />
            <div class="flex">
              <span v-for="star in stars(value, 'elements')" :key="star" :class="star <= stars(value, 'elements') ? 'text-yellow-400' : 'text-gray-600'">★</span>
            </div>
          </div>
        </div>

        <!-- Status Weaknesses -->
        <div>
          <div v-for="(value, status) in monster.status" :key="status" class="flex items-center mb-1">
            <img
              :src="`/images/icons/${status}.png`"
              :alt="status"
              class="w-6 h-6 mr-2"
            />
            <div class="flex">
              <span v-for="star in stars(value, 'status')" :key="star" :class="star <= stars(value, 'status') ? 'text-yellow-400' : 'text-gray-600'">★</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Misc Items (Bottom Row) -->
    <div class="mt-4 flex flex-wrap gap-2 justify-center">
      <img
        v-if="monster.misc.severable"
        src="/images/icons/sword.png"
        alt="Severable"
        title="Severable Parts"
        class="w-8 h-8"
      />
      <img
        v-if="monster.misc.flash"
        src="/images/icons/flash_pod.png"
        alt="Flash Pod"
        title="Flash Pod"
        class="w-8 h-8"
      />
      <img
        v-if="monster.misc.sonic"
        src="/images/icons/sonic_pod.png"
        alt="Sonic Pod"
        title="Sonic Pod"
        class="w-8 h-8"
      />
      <img
        v-if="monster.misc.shock"
        src="/images/icons/shock_trap.png"
        alt="Shock Trap"
        title="Shock Trap"
        class="w-8 h-8"
      />
      <img
        v-if="monster.misc.pitfall"
        src="/images/icons/pitfall_trap.png"
        alt="Pitfall Trap"
        title="Pitfall Trap"
        class="w-8 h-8"
      />
      <img
        v-if="monster.misc.vine"
        src="/images/icons/vine_trap.png"
        alt="Vine Trap"
        title="Vine Trap"
        class="w-8 h-8"
      />
      <img
        v-if="monster.misc.dung"
        src="/images/icons/dung_pod.png"
        alt="Dung Pod"
        title="Dung Pod"
        class="w-8 h-8"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  monster: { type: Object, required: true },
});

// Calculate stars based on your thresholds
const stars = (value, type) => {
  var returnval;
  if (type === 'status') {
    // Status: value = number of stars (1-3)
    returnval = value;
  } else {
    // Elements/Weapons: 0=0, 1-20=1, 20-39=2, 40-59=3, 60+=4
    if (value === 0) {
      returnval = 0;
    } else if (value <= 20) {
      returnval = 1;
    } else if (value <= 39) {
      returnval = 2;
    } else if (value <= 59) {
      returnval = 3;
    } else {
      returnval = 4;
    }
  }
    console.log(`Status Value: ${value}, Type: ${type}, return; ${returnval}`);  // Debug individual values
    return returnval;
};
</script>
