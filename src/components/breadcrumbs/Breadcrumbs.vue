<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const breadcrumbs = ref<{ text: string; href: string }[]>([])

const updateBreadcrumbs = () => {
  const matched = route.matched
  const newBreadcrumbs = matched
    .map((record, index) => {
      const { path, meta } = record

      let breadcrumb = ''

      if (typeof meta.breadcrumb === 'function') {
        breadcrumb = meta.breadcrumb({ ...route, matched: matched.slice(0, index + 1) })
      } else if (typeof meta.breadcrumb === 'string') {
        breadcrumb = meta.breadcrumb
      }

      let href = router.resolve(path).href

      if (index === matched.length - 2) {
        href = router.resolve(path).href.replace(':categoryId', breadcrumb)
      }
      return {
        text: breadcrumb,
        href: href,
      }
    })
    .filter((item) => item.text)

  breadcrumbs.value = [{ text: 'Main', href: '/main' }, ...newBreadcrumbs]
}

watch(route, updateBreadcrumbs, { immediate: true })
</script>

<template>
  <v-breadcrumbs v-if="breadcrumbs.length > 1">
    <v-breadcrumbs-item
      v-for="(item, index) in breadcrumbs"
      :key="item.text"
      :to="item.href"
      :disabled="index === breadcrumbs.length - 1"
      >{{ item.text
      }}<v-breadcrumbs-divider v-if="index < breadcrumbs.length - 1" disabled
        >/</v-breadcrumbs-divider
      >
    </v-breadcrumbs-item></v-breadcrumbs
  >
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';

::v-deep(.v-breadcrumbs-item--link) {
  text-transform: capitalize;
}

::v-deep(.v-breadcrumbs-divider) {
  color: constants.$color-text-dark;
}
</style>
