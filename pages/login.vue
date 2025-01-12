<template>
  <div>
    <!-- <Header /> -->
    <MyLogin/>
    <!-- <Footer /> -->
    </div>
</template>
<script setup>
import useCommonHead from "~/utils/useCommonHead";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

useCommonHead(
  t("login.title") + ' | ' + t("index.title_keyword"),
  t("login.title_desc")
);
</script>
