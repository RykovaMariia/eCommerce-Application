<script setup lang="ts">
import Breadcrumb from '@components/breadcrumbs/Breadcrumb.vue'
import Tab from '@components/tab/Tab.vue'
import ProfileEditForm from '@/pages/ProfilePage/components/ProfileEditForm.vue'
import ProfileAddress from '@/pages/ProfilePage/components/ProfileAddress.vue'
import { ref } from 'vue'
const items = [
  {
    title: 'Main',
    disabled: false,
    href: '/',
  },
  {
    title: 'Profile',
    disabled: true,
    href: '/profile',
  },
]

const tab = ref('option-2')
</script>

<template>
  <v-container class="container">
    <Breadcrumb :items="items" />
    <v-col class="page-card">
      <div class="d-flex flex-row">
        <div class="d-flex flex-column aside-left">
          <v-col>
            <div class="profile-info">
              <div><v-icon>mdi-panda</v-icon></div>
              <div class="profile-info__name">
                <div>Petr Ivanov</div>
                <div class="info-data">22.03.2000</div>
              </div>
            </div>
          </v-col>
          <v-tabs v-model="tab" color="primary" direction="vertical">
            <Tab prepend-icon="mdi-account-edit" text="edit profile" value="option-1" />
            <Tab prepend-icon="mdi-home" text="adress" value="option-2" />
            <Tab prepend-icon="mdi-lock" text="change password" value="option-3" />
          </v-tabs>
        </div>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="option-1">
            <v-col flex-column>
              <div class="user-information">User information</div>
              <div class="user-text">Here you can edit information about yourself</div>
            </v-col>
            <ProfileEditForm />
          </v-tabs-window-item>

          <v-tabs-window-item value="option-2">
            <v-col>
              <ProfileAddress />
            </v-col>
          </v-tabs-window-item>

          <v-tabs-window-item value="option-3">
            <v-col flat> password </v-col>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </v-col>
  </v-container>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';
@use '@/styles/mixins.scss';

.aside-left {
  gap: 15px;
  align-self: flex-start;
  border-right: 1px solid constants.$color-border-opacity;
}

.profile-info {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.v-btn {
  text-transform: capitalize;
}

.v-window {
  flex-grow: 1;
  margin-left: 1rem;
}

.profile-info__name {
  display: flex;
  flex-direction: column;
}

.user-information {
  font-size: 1.5rem;
  color: constants.$color-primary;
}

.info-data,
.user-text {
  font-size: 12px;
  color: constants.$color-text-placeholder;
}
</style>
