<script setup lang="ts">
import Tab from '@components/tab/Tab.vue'
import UserInfo from '@/pages/ProfilePage/components/UserInfo.vue'
import ProfileEditForm from '@/pages/ProfilePage/components/ProfileEditForm.vue'
import ProfileAddress from '@/pages/ProfilePage/components/ProfileAddress.vue'
import PasswordEditForm from '@/pages/ProfilePage/components/PasswordEditForm.vue'
import { ref, type Ref } from 'vue'
import { customerService } from '@/services/customerService'
import type { Customer } from '@commercetools/platform-sdk'
import { useUserAuthStore } from '@/stores/userAuth'
import type { UserData } from '@/interfaces/userData'
import { useAlertStore } from '@/stores/alert'

const alert = useAlertStore()

const tab = ref('address')

const userInfo: Ref<UserData> = ref({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
})

const customer: Ref<Customer> = ref({
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

function updateUserInfo(user: UserData) {
  if (!user) {
    return
  }
  userInfo.value = user
}

customerService
  .user()
  .then((response) => {
    customer.value = { ...response.body }
    userInfo.value = { ...response.body }
    useUserAuthStore().customerVersion = customer.value.version
  })
  .catch((error: Error) => {
    alert.show(`Error: ${error.message}`, 'warning')
  })
</script>

<template>
  <v-container class="container">
    <v-col class="page-card profile-card">
      <div class="d-flex main-content">
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
            <PasswordEditForm :email="customer.email" />
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </v-col>
  </v-container>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';
@use '@/styles/mixins.scss';

.container {
  margin-top: 3rem;
}

.main-content {
  @include mixins.media-mobile {
    flex-direction: column;
  }
  flex-direction: row;
  min-height: 35rem;
}

.profile-card {
  width: 100%;
  max-width: 60rem;
  margin: auto;
}

.aside-left {
  @include mixins.media-middle {
    width: 40%;
  }

  @include mixins.media-mobile {
    width: 100%;
  }
  gap: 1rem;
  align-self: flex-start;
  width: 23%;
}

.tab-content {
  @include mixins.media-mobile {
    border-top: 1px solid constants.$color-border-opacity;
    border-left: none;
  }
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
