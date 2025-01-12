<template>
    <div>
      <div class="gcse-search"></div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  
  onMounted(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://cse.google.com/cse.js?cx=006d01ae5afcd47d5";
    document.head.appendChild(script);
  });
  </script>
  