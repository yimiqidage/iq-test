<template>
  <div>
    <FAQ :isFaqPage="true"/>
  </div>
</template>
<script setup>

import useCommonHead from "~/utils/useCommonHead";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

useCommonHead(
  t("faq.title") + ' | ' + t("index.title_keyword"),
  t("faq.title_desc") 
);

</script>
  