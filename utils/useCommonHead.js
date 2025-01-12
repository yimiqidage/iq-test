import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';


export default function useCommonHead(title = '', description = '') {
    const { t, locale, locales } = useI18n();
    const route = useRoute();
    const switchLocalePath = useSwitchLocalePath();

    

    // 获取域名
    const { domain } = useRuntimeConfig().public;

    // 设置唯一路径
    const canonicalUrl = domain + route.path;

    // 设置hreflang属性，原因：https://ahrefs.com/blog/zh/hreflang-tags/
    const alternateLinks = ref(locales.value.map(locale => {
        switchLocalePath(locale.code);
        return {
            rel: 'alternate',
            href: domain + switchLocalePath(locale.code), // 假设每个语言环境都有对应的 URL 路径
            hreflang: locale.hl // 使用 ISO 代码作为 hreflang
        }
    }))
    // 添加默认的 hrefLang
    const defaultHrefLang = { rel: 'alternate', hreflang: 'x-default', href: domain + switchLocalePath('en') };
    alternateLinks.value.push(defaultHrefLang);
    const canonical = { rel: 'canonical', href: canonicalUrl };
    alternateLinks.value.push(canonical);

    // jsonld 结构化数据：https://developers.google.com/search/docs/appearance/structured-data/software-app?hl=zh_CN
    const jsonldData = JSON.stringify({
        "@context": "http://schema.org",
        "@type": "SoftwareApplication", // 应用程序的类别
        "name": title, //  应用程序的名称。
        "description": description, //  描述了应用程序
        "applicationCategory": "Utility",
        "operatingSystem": ["iOS", "Android", "Windows", "MacOS"],  // 所有支持的操作系统
        "offers": { // 描述了有关应用程序的价格信息，包括价格和货币。
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": { // 提供了关于应用程序的综合评分信息，包括评分值和评分人数
          "@type": "AggregateRating",
          "ratingValue": "4.3",
          "ratingCount": "1024"
        }
      });
    
    useHead({
        title: title,
        meta: [
            { name: 'description', content: description }
        ],
        
        // 添加 hreflang 属性，针对每种语言，分别添加
        link: alternateLinks.value,
        // 设置html的lang属性
        htmlAttrs: {
            lang: locale.value,
        },
        script: [
            {
              type: 'application/ld+json',
              children: jsonldData,
            }
          ]
    });


}
