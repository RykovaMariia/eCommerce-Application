<script setup lang="ts">
import type { UserData } from '@/interfaces/userData'
import { computed } from 'vue'
import { formateDate } from '@/utils/dateUtils'

const user = defineModel<UserData>('userInfo')

const firstName = computed(() => {
  return user.value?.firstName ?? ''
})
const lastName = computed(() => {
  return user.value?.lastName ?? ''
})
const dateOfBirth = computed(() => {
  return user.value ? formateDate(user.value?.dateOfBirth || '') : ''
})
</script>

<template>
  <div class="profile-info">
    <div><v-icon size="x-large" icon="mdi-account"></v-icon></div>
    <div class="name">
      <div>{{ firstName }} {{ lastName }}</div>
      <div class="info-data">{{ dateOfBirth }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';
@use '@/styles/mixins.scss';

.profile-info {
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;

  padding: 12px 1px;

  & .name {
    display: flex;
    flex-direction: column;
  }
}

.info-data {
  font-size: 0.75rem;
  color: constants.$color-text-placeholder;
}
</style>
