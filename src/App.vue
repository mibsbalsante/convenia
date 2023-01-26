<script setup>
import GlobalHeader from "@/components/GlobalHeader.vue";
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("[Restaurant - SW] registered"))
      .catch((err) =>
        console.log(
          "[Restaurant - SW] not registered, see log for details",
          err
        )
      );
  });
}
</script>

<template>
  <GlobalHeader />
  <RouterView />
</template>

<style scoped lang="scss"></style>
