<template>
  <tr
    v-for="(user, index) in usersList"
    :key="index"
    class="table-row"
  >
    <td class="table-cell table-id">
      {{ user.id }}
    </td>
    <td class="table-cell table-login">
      {{ user.login }}
    </td>
    <td class="table-cell table-role">
      {{ user.role }}
    </td>
    <td
      class="table-cell table-status"
      :class="[currentIndex === index ? statusClass: '']"
    >
      <Toggle
        v-model="user.isActive"
        @change="updateStatus(user, index)"
      />
    </td>
    <td class="table-cell table-createDate">
      {{ dataFormatting(user.createUser) }}
    </td>
    <td
      class="table-cell table-program"
      :class="[programIndex === user.id + 'program' ? statusClass: '']"
    >
      <CustomSelect
        v-if="PartnerPrograms"
        :options="PartnerPrograms"
        :value-input="user.partnerProgramName"
        class="select"
        :data="user"
        @change-select="changeProgramLevel"
      />
    </td>
    <td class="table-cell table-profile">
      <div class="info">
        <div
          class="info-profile"
          @click="profileInfo(user)"
        >
          <img
            src="../../../assets/img/icons/info.svg"
            alt=""
          >
        </div>
        <div
          class="info-password"
          @click="changePassword(user)"
        >
          <img
            src="../../../assets/img/icons/passwordLock.svg"
            alt=""
          >
          Password
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import {mapGetters} from 'vuex';
import moment from 'moment';
import Toggle from '@vueform/toggle'
import CustomSelect from '../partials/CustomSelect'
import UserService from '../../../services/user.service'
import PartnerService from '../../../services/partner.service'

export default {
  name: "UserListItem",
  components: {
    Toggle,
    CustomSelect
  },
  props: {
    usersList: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      isPopUp: null,
      search: null,
      dateFormat: 'DD.MM.YYYY',
      statusClass: '',
      currentIndex: null,
      programIndex: null,
    }
  },
  computed: {
    ...mapGetters({
      UserItem: 'getUserItem',
      Notification: 'getNotification',
    }),
    PartnerPrograms: {
      get() {
        return this.$store.state.programsList;
      },
      set(value) {
        this.$store.commit('setProgramAll', value);
      }
    }
  },
  mounted() {
    this.$store.dispatch('getPartnersProgram');
  },
  methods: {
    dataFormatting(value) {
      return moment(value).format(this.dateFormat);
    },
    profileInfo(user) {
      this.$store.commit('setProfile', user);
    },
    changePassword(user) {
      this.$store.commit('setUserItem', user);
    },
    setNotification(data) {
      let result = {};

      if (data.name) {
        result = {
          name: data.name,
          value: data.value,
        }
      }
      this.$store.commit('setNotification', result);
    },
    changeProgramLevel(data) {
      this.programIndex = data.data.id + 'program';
      this.currentIndex = null;
      this.setNotification({name: 'Partner program', value: data.option.name});
      this.emitter.on('update-notification', () => {
        if (this.Notification.name) {
          PartnerService.changePartnerProgram(data.data.id, data.option.id).then(() => {
            this.statusClass = 'status-success';
            setTimeout(() => {
              this.statusClass = '';
            }, 3000);
            this.setNotification({});
          }).catch(() => {
            this.statusClass = 'status-error';
            this.setNotification({name: 'Error', value: data.option.name});
          });
        }
      });
    },
    updateStatus(user, index) {
      this.currentIndex = index;
      this.programIndex = null;
      this.setNotification({name: 'Update status', value: 'status: ' + user.isActive});
      this.emitter.on('update-notification', () => {
        if (this.Notification.name) {
          UserService.updateStatus({id: user.id, status: user.isActive}).then(() => {
            this.statusClass = 'status-success';
            setTimeout(() => {
              this.statusClass = '';
            }, 3000);
            this.setNotification({});
          }).catch(() => {
            this.statusClass = 'status-error';
            this.setNotification({name: 'Error', value: 'status: ' + user.isActive});
          });
        }
      });
    }
  },
}
</script>

<style lang="scss">
@import "~@vueform/toggle/themes/default.css";

.table-row {
  .table-status {
    .toggle {
      width: var(--toggle-width, 21px);
      height: var(--toggle-height, 9px);
      outline: none;

      &-container {
        &:focus {
          box-shadow: none;
        }
      }
    }

    .toggle-on {
      background: var(--toggle-bg-on, #02C076);
      border-color: var(--toggle-border-on, #02C076);
    }

    .toggle-handle-on {
      transform: translateX(-110%);
    }

    .toggle-handle {
      width: 7px;
      height: 7px;
      top: 1px;
    }
  }
}

</style>