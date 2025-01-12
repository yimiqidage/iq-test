<template>
    <div>
      <Header />
      <MyRegister/>
      <Footer />
      </div>
  </template>
  <script setup>

import useCommonHead from "~/utils/useCommonHead";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

useCommonHead(
  t("register.title") + ' | ' + t("index.title_keyword"),
  t("register.title_desc") 
);
</script>
  