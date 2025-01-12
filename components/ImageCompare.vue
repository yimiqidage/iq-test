<template>
    <div 
      class="relative mx-auto overflow-hidden group" 
      :style="{
        maxWidth: `${maxWidth}px`,
        maxHeight: `${maxHeight}px`,
        width: containerWidth ? `${containerWidth}px` : 'auto',
        height: containerHeight ? `${containerHeight}px` : 'auto'
      }"
    >
      <!-- Container for images -->
      <div 
        class="relative w-full h-full"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        @mouseenter="isHovering = true"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        ref="container"
      >
        <!-- Loading state -->
        <div 
          v-if="isLoading" 
          class="absolute inset-0 flex items-center justify-center bg-gray-100"
        >
          <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
  
        <!-- Image container - only shown when images are loaded -->
        <div v-show="!isLoading" class="w-full h-full">
          <!-- After Image (Right) -->
          <img 
            :src="afterImage" 
            alt="After"
            class="absolute top-0 left-0 w-full h-full object-contain"
            @load="handleImageLoad"
            ref="afterImageRef"
          />
          
          <!-- Before Image (Left) with clip path -->
          <div 
            class="absolute top-0 left-0 w-full h-full"
            :style="{
              clipPath: `inset(0 ${100 - (sliderPosition * 100)}% 0 0)`
            }"
          >
            <img 
              :src="beforeImage" 
              alt="Before"
              class="w-full h-full object-contain"
              @load="handleImageLoad"
              ref="beforeImageRef"
            />
          </div>
  
          <!-- Slider Line -->
          <div 
            class="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize transform -translate-x-1/2 transition-opacity duration-300 touch-none"
            :class="{ 'opacity-50': !isDragging && !isHovering }"
            :style="{ left: `${sliderPosition * 100}%` }"
            @mousedown="startDragging"
            @touchstart.prevent="startDragging"
          >
            <!-- Slider Handle -->
            <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize touch-none">
              <div class="flex items-center gap-1">
                <div class="w-1 h-4 bg-gray-400 rounded-full"></div>
                <div class="w-1 h-4 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    beforeImage: {
      type: String,
      required: true
    },
    afterImage: {
      type: String,
      required: true
    },
    maxWidth: {
      type: Number,
      default: 800
    },
    maxHeight: {
      type: Number,
      default: 600
    }
  });
  
  const container = ref(null);
  const beforeImageRef = ref(null);
  const afterImageRef = ref(null);
  const sliderPosition = ref(0.5);
  const isDragging = ref(false);
  const isHovering = ref(false);
  const isLoading = ref(true);
  const loadedImages = ref(0);
  const containerWidth = ref(0);
  const containerHeight = ref(0);
  
  // 处理图片加载和容器尺寸计算
  const handleImageLoad = (event) => {
    loadedImages.value++;
    
    if (loadedImages.value === 2) {
      // 获取图片的原始尺寸
      const img = event.target;
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      const imageAspectRatio = naturalWidth / naturalHeight;
  
      // 计算容器尺寸
      let width, height;
  
      if (imageAspectRatio >= 1) {
        // 横向或方形图片
        if (naturalWidth > props.maxWidth) {
          width = props.maxWidth;
          height = width / imageAspectRatio;
        } else {
          width = naturalWidth;
          height = naturalHeight;
        }
        
        // 检查高度是否超过最大值
        if (height > props.maxHeight) {
          height = props.maxHeight;
          width = height * imageAspectRatio;
        }
      } else {
        // 纵向图片
        if (naturalHeight > props.maxHeight) {
          height = props.maxHeight;
          width = height * imageAspectRatio;
        } else {
          width = naturalWidth;
          height = naturalHeight;
        }
        
        // 检查宽度是否超过最大值
        if (width > props.maxWidth) {
          width = props.maxWidth;
          height = width / imageAspectRatio;
        }
      }
  
      // 更新容器尺寸
      containerWidth.value = width;
      containerHeight.value = height;
      isLoading.value = false;
  
      // 触发一次 resize 以确保正确布局
      nextTick(() => {
        handleResize();
      });
    }
  };
  
  onMounted(() => {
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('resize', handleResize);
    window.addEventListener('touchend', stopDragging);
    window.addEventListener('touchcancel', stopDragging);
  });
  
  onUnmounted(() => {
    window.removeEventListener('mouseup', stopDragging);
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('touchend', stopDragging);
    window.removeEventListener('touchcancel', stopDragging);
  });
  
  const handleResize = () => {
    if (container.value) {
      const rect = container.value.getBoundingClientRect();
      containerWidth.value = rect.width;
      containerHeight.value = rect.height;
    }
  };
  
  const getRelativePosition = (clientX) => {
    const rect = container.value.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  };
  
  const handleMouseMove = (event) => {
    if (!isDragging.value && isHovering.value) {
      sliderPosition.value = getRelativePosition(event.clientX);
    }
  };
  
  const handleTouchMove = (event) => {
    if (isDragging.value && event.touches.length === 1) {
      event.preventDefault();
      const touch = event.touches[0];
      sliderPosition.value = getRelativePosition(touch.clientX);
    }
  };
  
  const handleTouchStart = (event) => {
    if (event.touches.length === 1) {
      isHovering.value = true;
      const touch = event.touches[0];
      const relativePos = getRelativePosition(touch.clientX);
      const currentPos = sliderPosition.value;
      
      if (Math.abs(relativePos - currentPos) < 0.05) {
        startDragging();
      }
    }
  };
  
  const handleTouchEnd = () => {
    stopDragging();
    isHovering.value = false;
  };
  
  const handleMouseLeave = () => {
    if (!isDragging.value) {
      isHovering.value = false;
    }
  };
  
  const startDragging = () => {
    isDragging.value = true;
  };
  
  const stopDragging = () => {
    isDragging.value = false;
  };
  
  const handleDrag = (event) => {
    if (isDragging.value && container.value) {
      sliderPosition.value = getRelativePosition(event.clientX);
    }
  };
  </script>