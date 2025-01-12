<!-- 图片对比插件 -->
<template>
  <div 
    class="relative mx-auto overflow-hidden group" 
    :style="{
      maxWidth: `${maxWidth}px`,
      maxHeight: `${maxHeight}px`,
      width: '100%',
      aspectRatio: containerAspect
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
      <div 
        v-show="!isLoading" 
        class="absolute inset-0"
        :style="{
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }"
      >
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

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
const isLoading = ref(true); // 初始设置为 true
const loadedImages = ref(0);
const imageWidth = ref(0);
const imageHeight = ref(0);
const containerAspect = ref('1');

// 处理图片加载和容器尺寸计算
const handleImageLoad = () => {
  loadedImages.value++;
  
  if (loadedImages.value === 2) {
    const beforeImg = beforeImageRef.value;
    const afterImg = afterImageRef.value;
    
    if (!beforeImg || !afterImg) return;

    // 获取两张图片的原始尺寸
    const beforeWidth = beforeImg.naturalWidth;
    const beforeHeight = beforeImg.naturalHeight;
    const afterWidth = afterImg.naturalWidth;
    const afterHeight = afterImg.naturalHeight;
    
    // 使用较大的尺寸作为基准
    const maxNaturalWidth = Math.max(beforeWidth, afterWidth);
    const maxNaturalHeight = Math.max(beforeHeight, afterHeight);
    
    // 计算最终显示尺寸
    let finalWidth = maxNaturalWidth;
    let finalHeight = maxNaturalHeight;
    
    // 如果超出最大宽度限制
    if (finalWidth > props.maxWidth) {
      finalWidth = props.maxWidth;
      finalHeight = (finalWidth / maxNaturalWidth) * maxNaturalHeight;
    }
    
    // 如果高度超出最大高度限制
    if (finalHeight > props.maxHeight) {
      finalHeight = props.maxHeight;
      finalWidth = (finalHeight / maxNaturalHeight) * maxNaturalWidth;
    }
    
    // 设置最终尺寸
    imageWidth.value = finalWidth;
    imageHeight.value = finalHeight;
    containerAspect.value = `${finalWidth} / ${finalHeight}`;
    
    // 延迟设置 isLoading 为 false，确保图片完全加载
    nextTick(() => {
      isLoading.value = false;
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
  if (!container.value || isLoading.value) return;

  const rect = container.value.getBoundingClientRect();
  const containerWidth = rect.width;
  const containerHeight = rect.height;

  // 计算图片在容器中的实际尺寸，保持宽高比
  const imageAspect = imageWidth.value / imageHeight.value;
  const containerAspect = containerWidth / containerHeight;

  if (imageAspect > containerAspect) {
    // 图片更宽，以容器宽度为准
    imageWidth.value = containerWidth;
    imageHeight.value = containerWidth / imageAspect;
  } else {
    // 图片更高，以容器高度为准
    imageHeight.value = containerHeight;
    imageWidth.value = containerHeight * imageAspect;
  }
};

const getRelativePosition = (clientX) => {
  if (!container.value) return 0.5;
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