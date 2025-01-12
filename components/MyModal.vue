<template>
    <div id="app" class="relative">
      <!-- Modal Overlay -->
      <teleport to="body">
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showModal = false">
           <!-- 添加一个关闭按钮 -->
          <div class="modal-content bg-white p-6 rounded-lg max-w-sm mx-auto text-center" @click.stop>
            <MyRegister/>
          </div>
        </div>
      </teleport>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showModal = ref(true);
  
  function register() {
    // Registration logic
  }
  </script>
  