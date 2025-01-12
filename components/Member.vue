<template>
    <div v-if="membershipData" class="bg-[#f2f0ff] rounded-xl p-6 max-w-md mx-auto shadow-md">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gray-800">{{ $t('membership.info') }}</h2>
        <div :class="[
          'text-white text-sm font-semibold px-3 py-1 rounded-full',
          isActive ? 'bg-[#7e6fff]' : 'bg-red-500'
        ]">
          {{ isActive ? $t('membership.active') : $t('membership.expired') }}
        </div>
      </div>
      <div class="bg-white rounded-lg p-4 mb-4 shadow-sm">
        <p class="text-lg" v-if="membershipData.memberType === 1">
          {{ isActive ? $t('membership.validUntil') : $t('membership.expiredOn') }}
          <span :class="['font-semibold', isActive ? 'text-[#7e6fff]' : 'text-red-500']">
            {{ membershipData.expireDate }}
          </span>
        </p>
        <p class="text-lg" v-else-if="membershipData.memberType === 2">
          <span v-if="membershipData.leftCount > 0">
            {{ $t('membership.remainingUses') }}
            <span class="font-semibold text-[#7e6fff]">{{ membershipData.leftCount }}</span>
          </span>
          <span v-else class="font-semibold text-red-500">
            {{ $t('membership.noUsesLeft') }}
          </span>
        </p>
      </div>
      <div v-if="isActive">
        <h3 class="text-xl font-semibold text-gray-700 mb-2">{{ $t('membership.benefits') }}</h3>
        <ul class="space-y-2">
          <li v-for="(benefit, index) in benefits" :key="index" class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-600">{{ $t(benefit) }}</span>
          </li>
        </ul>
      </div>
      <div v-else class="mt-4">
        <a href="/pricing" class="bg-[#7e6fff] text-white font-semibold px-4 py-2 rounded-full inline-block hover:bg-[#6a5adb] transition-colors">
          {{ $t('membership.renew') }}
        </a>
      </div>
    </div>
    <div v-else class="text-center py-4">
      {{ $t('membership.loading') }}
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  const { get } = useApi()
  import { getUerApiKey } from '@/services/user'
  import { useRuntimeConfig } from '#app'
  
  const { t } = useI18n()
  
  let apiKey = getUerApiKey();
  let merchId = useRuntimeConfig().public.merchId
  
  const membershipData = ref(null)
  
  const isActive = computed(() => {
    if (!membershipData.value) return false
    
    if (membershipData.value.memberType === 1) {
      return Date.now() <= membershipData.value.expireTimeMSeconds
    } else if (membershipData.value.memberType === 2) {
      return membershipData.value.leftCount > 0
    }
    
    return false
  })
  
  const benefits = [
    'membership.benefitAccess',
    'membership.benefitSupport',
    'membership.benefitAdFree',
    'membership.benefitExclusive'
  ]
  
  const fetchMembershipData = async () => {
    try {
      let param = {
        merchId: merchId,
        apiKey: apiKey
      };
  
      const response = await get(ENDPOINTS.MEMBER.QUERY, param);
      console.log(response)
      membershipData.value = response
    } catch (error) {
      console.error('Error fetching membership data:', error)
    }
  }
  
  onMounted(fetchMembershipData)
  </script>