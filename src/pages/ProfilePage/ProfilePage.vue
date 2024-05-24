<script setup lang="ts">
import Breadcrumb from '@components/breadcrumbs/Breadcrumb.vue'
import Tab from '@components/tab/Tab.vue'
import ProfileEditForm from '@/pages/ProfilePage/components/ProfileEditForm.vue'
import ProfileAddress from '@/pages/ProfilePage/components/ProfileAddress.vue'
import { onMounted, ref, type Ref } from 'vue'
import { customerService } from '@/services/customerService'
import type { Customer } from '@commercetools/platform-sdk'

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

const tab = ref('address')

let customer: Ref<Customer> = ref({
  id: '',
  version: 0,
  createdAt: '',
  lastModifiedAt: '',
  lastModifiedBy: {
    clientId: '',
    anonymousId: '',
  },
  createdBy: {
    clientId: '',
    anonymousId: '',
  },
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  password: '',
  addresses: [],
  shippingAddressIds: [],
  billingAddressIds: [],
  isEmailVerified: false,
  stores: [],
  authenticationMode: '',
})

onMounted(() => {
  customerService
    .user()
    .then((response) => {
      customer.value = response.body
    })
    .catch((error: Error) => {
      throw new Error(error.message)
    })
})
</script>

<template>
  <v-container class="container">
    <Breadcrumb :items="items" />
    <v-col class="page-card">
      <div class="d-flex flex-row main-content">
        <div class="d-flex flex-column aside-left">
          <v-col>
            <div class="profile-info">
              <div><v-icon size="x-large" icon="mdi-account"></v-icon></div>
              <div class="profile-info__name">
                <div>{{ customer.firstName }} {{ customer.lastName }}</div>
                <div class="info-data">{{ customer.dateOfBirth }}</div>
              </div>
            </div>
          </v-col>
          <v-tabs v-model="tab" color="primary" direction="vertical">
            <Tab prepend-icon="mdi-account-edit" text="edit profile" value="profile" />
            <Tab prepend-icon="mdi-home" text="address" value="address" />
            <Tab prepend-icon="mdi-lock" text="change password" value="password" />
          </v-tabs>
        </div>

        <v-tabs-window v-model="tab" class="tab-content">
          <v-tabs-window-item value="profile">
            <v-col flex-column>
              <div class="user-information">User information</div>
              <div class="user-text">Here you can edit information about yourself</div>
            </v-col>
            <ProfileEditForm v-model:current-user="customer" />
          </v-tabs-window-item>

          <v-tabs-window-item value="address">
            <v-col>
              <ProfileAddress v-model:current-user="customer" />
            </v-col>
          </v-tabs-window-item>

          <v-tabs-window-item value="password">
            <v-col> password </v-col>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </v-col>
  </v-container>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';
@use '@/styles/mixins.scss';

.main-content {
  min-height: 570px;
}

.aside-left {
  gap: 15px;
  align-self: flex-start;
}

.tab-content {
  border-left: 1px solid constants.$color-border-opacity;
}

.profile-info {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
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
