<template>
  <tr
    v-for="(program, index) in programsList"
    :key="index"
    class="table-row"
  >
    <td class="table-cell table-name">
      {{ program.name }}
    </td>
    <td class="table-cell table-value">
      {{ program.partnerValue }}
    </td>
    <td class="table-cell table-id">
      {{ program.id }}
    </td>
    <td
      class="table-cell table-status"
      :class="[currentIndex === index ? statusClass: '']"
    >
      <Toggle
        v-model="program.isActive"
        @click="updateStatus(program, index)"
      />
    </td>
    <td class="table-cell table-edit">
      <div class="info">
        <div
          class="info-edit"
          @click="editTariff(program)"
        >
          <img
            src="../../../assets/img/icons/edit-icon.svg"
            alt=""
          >
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
    import Toggle from '@vueform/toggle'
    import PartnerService from '../../../services/partner.service'
    import {mapGetters} from 'vuex';

    export default {
        name: "ProgramsListIem",
        components: {
            Toggle
        },
        props: {
            programsList: {
                type: Array,
              default: null,
            },
        },
        data() {
            return {
                isPopUp: null,
                search: null,
                statusClass: '',
                currentIndex: null,
            }
        },
        computed: {
            ...mapGetters({
                Notification: 'getNotification',
            })
        },
        methods: {
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
            updateStatus(program, index) {
                this.currentIndex = index;
                this.setNotification({name: 'Update isActive', value: 'Is active: ' + program.isActive});
                this.emitter.on('update-notification', () => {
                    if (this.Notification.name) {
                        PartnerService.editPartnerProgram(program.id,  program).then(() => {
                            this.statusClass = 'isActive-success';
                            setTimeout(() => {
                                this.statusClass = '';
                            }, 3000);
                            this.setNotification({});
                        }).catch(() => {
                            this.statusClass = 'isActive-error';
                            this.setNotification({name: 'Error', value: 'Is active: ' + program.isActive});
                        });
                    }
                });
            },
            editTariff(program) {
                this.$store.commit('setEditTariffData', program);
            },
        }
    }
</script>

<style lang="scss">
    @import "~@vueform/toggle/themes/default.css";
</style>
