<template>
  <Menu as="div" class="relative inline-block text-left">
    <div class="mr-2">
      <MenuButton
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        {{ userEmail }}

        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
        class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        style="min-width: 150px; max-width: 300px; width: auto;">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <button @click="toLogout"
              :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-right text-sm']">Sign out</button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { logout, getUserEmail } from "@/services/user";
import MessageUtils from '@/utils/MessageUtils'
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();

const toLogout = async () => {
  logout();
  await router.push('/')

  window.location.reload()
  MessageUtils.successMsg(t('index.log_out_successs'));
}

const userEmail = ref(getUserEmail())

</script>
