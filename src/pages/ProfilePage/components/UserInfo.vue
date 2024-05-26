<script setup lang="ts">
const props = defineProps<{
  firstName?: string
  lastName?: string
  dateOfBirth?: string
}>()
</script>

<template>
  <v-col>
    <div class="profile-info">
      <div><v-icon size="x-large" icon="mdi-account"></v-icon></div>
      <div class="profile-info__name" v-if="props.firstName">
        <div>{{ props.firstName }} {{ props.lastName }}</div>
        <div class="info-data">{{ props.dateOfBirth }}</div>
      </div>
    </div>
  </v-col>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';
@use '@/styles/mixins.scss';

.profile-info {
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;
}

.profile-info__name {
  display: flex;
  flex-direction: column;
}

.user-information {
  font-size: 1.5rem;
  color: constants.$color-primary;
}

.info-data {
  font-size: 0.75rem;
  color: constants.$color-text-placeholder;
}
</style>
