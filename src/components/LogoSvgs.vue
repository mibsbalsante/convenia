<script setup>
import IconUtensils from "@fa/solid/utensils.svg";
import IconBowlFood from "@fa/solid/bowl-food.svg";
import IconMugHot from "@fa/solid/mug-hot.svg";

defineProps({
  lightModeGradient: Boolean,
});
</script>

<template>
  <div :class="{ logos: true, 'logos--gradient': lightModeGradient }">
    <IconUtensils id="logo-1" />
    <IconBowlFood id="logo-2" />
    <IconMugHot id="logo-3" />
    <svg width="0" height="0">
      <defs>
        <linearGradient id="logo-gradient" gradientTransform="rotate(80)">
          <stop offset="55%" stop-color="#dcedc1" />
          <stop offset="100%" stop-color="#ff8b94" />
        </linearGradient>
        <linearGradient
          id="logo-gradient-lightmode"
          gradientTransform="rotate(80)"
        >
          <stop offset="55%" stop-color="#75b39c" />
          <stop offset="100%" stop-color="#ff8b94" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.logos {
  @include center;

  gap: 12px;

  svg:last-of-type {
    position: absolute;
  }

  @media (prefers-color-scheme: dark) {
    svg {
      fill: url("#logo-gradient");
    }
  }

  &--gradient {
    svg {
      fill: url("#logo-gradient-lightmode");

      @media (prefers-color-scheme: dark) {
        fill: url("#logo-gradient");
      }
    }
  }
}
</style>
