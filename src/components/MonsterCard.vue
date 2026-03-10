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
          <img :src="`./images/icons/${weapon}.png`" :alt="weapon" class="w-9 p-1" />
          <div class="flex"><span v-for="star in stars(value, 'elements')" :key="star"
              class="text-xs text-ctp-yellow"><i class="fa-solid fa-star"></i></span>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-2 gap-4">
        <!-- Elemental Weaknesses  -->
        <div class="flex flex-col min-w-24">
          <div v-for="(value, element) in monster.elements" :key="element" class="flex items-center">
            <img v-if="best(value, monster.elements) != 0" :src="`./images/icons/${element}.png`" :alt="element"
              class="w-9 mr-2 p-1 drop-shadow-[0_0px_6px_rgba(249,226,175,1)]" />
            <img v-else :src="`./images/icons/${element}.png`" :alt="element" class="w-9 mr-2 p-1" />
            <div class="flex">
              <span v-if="stars(value, 'elements') == 0" class="text-base text-ctp-red"><i
                  class="fa-solid fa-xmark"></i></span>
              <span v-for="star in stars(value, 'elements')" :key="star" class="text-base text-ctp-yellow"><i
                  class="fa-solid fa-star"></i></span>
            </div>
          </div>
        </div>
        <!-- Status Weaknesses -->
        <div class="flex flex-col">
          <div v-for="(value, status) in monster.status" :key="status" class="flex items-center">
            <img :src="`./images/icons/${status}.png`" :alt="status" class="w-9 mr-2 p-1" />
            <div class="flex">
              <span v-if="stars(value, 'status') == 0" class="text-base text-ctp-red"><i
                  class="fa-solid fa-xmark"></i></span>
              <span v-for="star in stars(value, 'status')" :key="star" class="text-base text-ctp-yellow-800"><i
                  class="fa-solid fa-star"></i></span>
            </div>
          </div>
        </div>
      </div>
      <div class="sm:gap-4 gap-2 flex justify-center p-2 text-sm items-center text-pretty">
        <span v-if="monster.kinsect.red != '0'" class="text-ctp-red flex items-center">
          <img src="/images/icons/kinsect.png" alt="kinsect" title="kinsect" class="w-7 sm:mr-4 mr-1" />{{
            monster.kinsect.red}}</span>
        <span v-if="monster.kinsect.orange != '0'" class="text-ctp-peach">{{ monster.kinsect.orange }}</span>
        <span v-if="monster.kinsect.white != '0'" class="text-ctp-text">{{ monster.kinsect.white }}</span>
        <span v-if="monster.kinsect.green != '0'" class="text-ctp-green">{{ monster.kinsect.green }}</span>
      </div>
      <!-- Misc Items (Bottom Row) -->
      <div class="flex justify-center p-1">
        <img v-if="monster.misc.severable" src="/images/icons/sword.png" alt="Severable" title="Severable Parts"
          class="w-8" />
        <img v-if="monster.misc.flash" src="/images/icons/flash_pod.png" alt="Flash Pod" title="Flash Pod"
          class="w-8" />
        <img v-if="monster.misc.sonic" src="/images/icons/sonic_pod.png" alt="Sonic Pod" title="Sonic Pod"
          class="w-8" />
        <img v-if="monster.misc.shock" src="/images/icons/shock_trap.png" alt="Shock Trap" title="Shock Trap"
          class="w-8" />
        <img v-if="monster.misc.pitfall" src="/images/icons/pitfall_trap.png" alt="Pitfall Trap" title="Pitfall Trap"
          class="w-8" />
        <img v-if="monster.misc.vine" src="/images/icons/vine_trap.png" alt="Vine Trap" title="Vine Trap" class="w-8" />
        <img v-if="monster.misc.dung" src="/images/icons/dung_pod.png" alt="Dung Pod" title="Dung Pod" class="w-8" />
      </div>
    </div>
  </div>
  <div class="text-ctp-lavender text-sm flex justify-center md:pt-8">
    <span v-if="monster.note != 0">{{ monster.note }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  monster: { type: Object, required: true },
});

// Calculate stars based on your thresholds
const best = (value, elements) => {

  // 1.75 is not effective...
  if (value < 1.76) return false;

  var maxVal = 0;
  var tolerance = 0.1;

  for (const key in elements) {
    if (elements.hasOwnProperty(key)) {
      const val = elements[key];
      if (val > maxVal) {
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
    return value;
  } else {
    return Math.round(value);
  }
};
</script>
