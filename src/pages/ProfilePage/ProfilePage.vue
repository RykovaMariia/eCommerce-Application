<script setup lang="ts">
import Breadcrumb from '@components/breadcrumbs/Breadcrumb.vue'
import Tab from '@components/tab/Tab.vue'
import UserInfo from '@/pages/ProfilePage/components/UserInfo.vue'
import ProfileEditForm from '@/pages/ProfilePage/components/ProfileEditForm.vue'
import ProfileAddress from '@/pages/ProfilePage/components/ProfileAddress.vue'
import PasswordEditForm from '@/pages/ProfilePage/components/PasswordEditForm.vue'
import { ref, type Ref } from 'vue'
import { customerService } from '@/services/customerService'
import type { Customer } from '@commercetools/platform-sdk'
import { userAuth } from '@/stores/userAuth'
import type { UserData } from '@/interfaces/userData'
import { alertStore } from '@/stores/alertStore'

const alert = alertStore()

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

let userInfo: Ref<UserData> = ref({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
})

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

customerService
  .user()
  .then((response) => {
    customer.value = response.body
    userInfo.value = { ...response.body }
    userAuth().customerVersion = customer.value.version
  })
  .catch((error: Error) => {
    alert.show(`Error: ${error.message}`, 'warning')
  })

function updateUserInfo(user: UserData) {
  if (!user) return
  userInfo.value = user
}
</script>

<template>
  <v-container class="container">
    <Breadcrumb :items="items" />
    <v-col class="page-card profile-card">
      <div class="d-flex flex-row main-content">
        <div class="d-flex flex-column aside-left">
          <UserInfo v-model:user-info="userInfo" />
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
            <ProfileEditForm v-model:current-user="customer" @updateUser="updateUserInfo($event)" />
          </v-tabs-window-item>

          <v-tabs-window-item value="address">
            <v-col>
              <ProfileAddress v-model:current-user="customer" />
            </v-col>
          </v-tabs-window-item>

          <v-tabs-window-item value="password">
            <v-col flex-column>
              <div class="user-information">Password information</div>
              <div class="user-text">Here you can edit your password</div>
            </v-col>
            <PasswordEditForm />
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
  min-height: 35rem;
}

.profile-card {
  width: 100%;
  max-width: 60rem;
  margin: auto;
}

.aside-left {
  gap: 1rem;
  align-self: flex-start;
  width: 20%;
}

.tab-content {
  border-left: 1px solid constants.$color-border-opacity;
}

.v-btn {
  text-transform: capitalize;
}

.v-window {
  flex-grow: 1;
  margin-left: 1rem;
}

.user-text {
  font-size: 0.75rem;
  color: constants.$color-text-placeholder;
}

.user-information {
  font-size: 1.5rem;
  color: constants.$color-primary;
}
</style>
