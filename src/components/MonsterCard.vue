<template>
  <h2 class="text-3xl text-center font-bold pb-2 md:pt-4 md:pb-6 text-ctp-peach">{{ monster.name }}</h2>
  <div className="flex flex-col justify-evenly md:flex-row">
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <img :src="monster.image" :alt="monster.name" class="object-contain object-center w-56 md:w-86"
          @error="$event.target.src = './images/icons/starx.png'" />
        </div>
        <span className="text-ctp-green mx-auto flex items-center gap-2">
          <i class="fa-solid fa-angles-up"></i>{{ monster.weakpoints }}</span>
    </div>
    <div className="flex flex-col p-2">
      <!-- Weapons -->
      <div class="flex justify-center gap-2">
        <div v-for="(value, weapon) in monster.weapon" :key="weapon" class="flex justify-center items-center ">
          <img :src="`./images/icons/${weapon}.png`" :alt="weapon" class="w-10 p-1" />
          <div class="flex"><span v-for="star in stars(value, 'elements')" :key="star" class="text-xs text-ctp-yellow"><i class="fa-solid fa-star"></i></span>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-2 gap-4">
        <!-- Elemental Weaknesses  -->
        <div class="flex flex-col min-w-32">
          <div v-for="(value, element) in monster.elements" :key="element" class="flex items-center">
            <img v-if="best(value, monster.elements) != 0" :src="`./images/icons/${element}.png`" :alt="element" class="w-10 mr-2 p-1 drop-shadow-[0_0px_6px_rgba(249,226,175,1)]" />
            <img v-else :src="`./images/icons/${element}.png`" :alt="element" class="w-10 mr-2 p-1" />
            <div class="flex">
              <span v-if="stars(value, 'elements') == 0" class="text-base text-ctp-red"><i class="fa-solid fa-xmark"></i></span>
              <span v-for="star in stars(value, 'elements')" :key="star" class="text-base text-ctp-yellow"><i class="fa-solid fa-star"></i></span>
            </div>
          </div>
        </div>
        <!-- Status Weaknesses -->
        <div class="flex flex-col min-w-32">
          <div v-for="(value, status) in monster.status" :key="status" class="flex items-center">
            <img :src="`./images/icons/${status}.png`" :alt="status" class="w-10 mr-2 p-1" />
            <div class="flex">
              <span v-if="stars(value, 'status') == 0" class="text-base text-ctp-red"><i class="fa-solid fa-xmark"></i></span>
              <span v-for="star in stars(value, 'status')" :key="star" class="text-base text-ctp-yellow-700"><i class="fa-solid fa-star"></i></span>
            </div>
          </div>
        </div>
      </div>
      <!-- Misc Items (Bottom Row) -->
      <div class="flex justify-center p-2">
        <img v-if="monster.misc.severable" src="/images/icons/sword.png" alt="Severable" title="Severable Parts"
          class="w-8 h-8" />
        <img v-if="monster.misc.flash" src="/images/icons/flash_pod.png" alt="Flash Pod" title="Flash Pod"
          class="w-8 h-8" />
        <img v-if="monster.misc.sonic" src="/images/icons/sonic_pod.png" alt="Sonic Pod" title="Sonic Pod"
          class="w-8 h-8" />
        <img v-if="monster.misc.shock" src="/images/icons/shock_trap.png" alt="Shock Trap" title="Shock Trap"
          class="w-8 h-8" />
        <img v-if="monster.misc.pitfall" src="/images/icons/pitfall_trap.png" alt="Pitfall Trap" title="Pitfall Trap"
          class="w-8 h-8" />
        <img v-if="monster.misc.vine" src="/images/icons/vine_trap.png" alt="Vine Trap" title="Vine Trap"
          class="w-8 h-8" />
        <img v-if="monster.misc.dung" src="/images/icons/dung_pod.png" alt="Dung Pod" title="Dung Pod"
          class="w-8 h-8" />
      </div>
    </div>
  </div>
  <div class="text-ctp-lavender flex justify-center md:pt-8">
    <span v-if="monster.note != 0">{{ monster.note }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  monster: { type: Object, required: true },
});

// Calculate stars based on your thresholds
const best = (value, elements) => {

  // under 18 is not effective...
  if(value < 14) return false;

  var maxVal = 0;
  var tolerance = 4;

  for (const key in elements) {
    if (elements.hasOwnProperty(key)) {
      const val = elements[key];
      if (val > maxVal){
        maxVal = val;
      }
    }
  }
  //console.log(`Value: ${value}, Max: ${maxVal}, Check: ${Math.abs(value - maxVal) <= tolerance}`);
  return Math.abs(value - maxVal) <= tolerance;


};

// Calculate stars based on your thresholds
const stars = (value, type) => {
  var returnval;
  if (type === 'status') {
    // Status: value = number of stars (1-3)
    /* 
      4 stars: 11 - 55
      3 Stars:  8 - 40
      2 Stars:  4 - 20
    */
    returnval = value;
  } else {
    if (value === 0) {
      returnval = 0;
    } else if (value <= 19) {
      returnval = 1;
    } else if (value <= 39) {
      returnval = 2;
    } else if (value <= 54) {
      returnval = 3;
    } else {
      returnval = 4;
    }
  }
  //console.log(`Status Value: ${value}, Type: ${type}, return; ${returnval}`);
  return returnval;
};
</script>
