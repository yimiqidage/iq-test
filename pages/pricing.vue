<template>
  <div>

    <Pricing />

  </div>
</template>
<script setup>

import useCommonHead from "~/utils/useCommonHead";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

useCommonHead(
  t("pricing.title") + ' | ' + t("index.title_keyword"),
  t("pricing.title_desc") 
);


</script>