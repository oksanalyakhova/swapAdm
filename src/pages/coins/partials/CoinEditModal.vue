<template>
  <div class="">
    <div
      class="coins-modal"
      tabindex="0"
      @keydown.esc="closePopup"
    >
      <div class="coins-modal-block">
        <div class="coins-modal-block-form">
          <div class="coins-modal-block-form-title">
            Edit coin
          </div>

          <div
            class="close"
            @click="closePopup"
          >
            <img
              src="../../../assets/img/close.svg"
              alt=""
            >
          </div>

          <div class="coins-modal-block-form-info-image">
            <label for="image">
              <img
                :src="domain + data.image"
                alt=""
              >
            </label>
            <input
              id="image"
              ref="uploadFile"
              type="file"
              @change="uploadFile"
            >
            <div
              class="coin-change"
              @click="$refs.uploadFile.click()"
            >
              Change image
            </div>
          </div>

          <div class="coins-modal-block-form-info-coin-edit">
            <div class="inputs">
              <div class="inputs-item">
                <div class="inputs-item-title">
                  Name
                </div>
                <input
                  v-model="coinData.name"
                  type="text"
                  :placeholder="data.name"
                >
              </div>
              <div class="inputs-item">
                <div class="inputs-item-title">
                  Code
                </div>
                <input
                  v-model="coinData.shotName"
                  type="text"
                  :placeholder="data.shotName"
                >
              </div>
              <div class="inputs-item">
                <div class="inputs-item-title">
                  User fee
                </div>
                <input
                  v-model="coinData.userFee"
                  type="number"
                  :placeholder="data.userFee"
                >
              </div>
              <div class="inputs-item">
                <div class="inputs-item-title">
                  Rating
                </div>
                <input
                  v-model="coinData.rating"
                  type="number"
                  :placeholder="data.rating"
                >
              </div>
              <div class="inputs-item">
                <div class="inputs-item-title">
                  Price round
                </div>
                <input
                  v-model="coinData.priceRound"
                  type="number"
                  :placeholder="data.priceRound"
                >
              </div>
              <div class="inputs-item">
                <div class="inputs-item-title">
                  Trade round
                </div>
                <input
                  v-model="coinData.tradeRound"
                  type="number"
                  :placeholder="data.tradeRound"
                >
              </div>
              <div class="inputs-item large">
                <div class="inputs-item-title">
                  Market URL
                </div>
                <input
                  v-model="coinData.marketUrl"
                  type="url"
                  :placeholder="data.marketUrl"
                >
              </div>
            </div>
            <div class="chains">
              <div
                class="chains-toggle"
                @click="isChains = !isChains"
              >
                <img
                  :class="{'toggled': isChains === true}"
                  src="../../../assets/img/icons/chains-toggle.svg"
                  alt=""
                >
                <div class="text">
                  Chains
                </div>
              </div>
              <div
                v-if="isChains"
                class="chains-block"
              >
                <table class="chains-block-table">
                  <thead>
                    <tr class="chains-block-table-headers">
                      <th
                        v-for="(item, index) in tableTh"
                        :key="index"
                        scope="col"
                      >
                        <div
                          class="text"
                          :class="item.cssClass"
                        >
                          {{ item.name }}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <ChainsList
                      v-if="CoinNetworkData.length"
                      :coin-network-list="CoinNetworkData"
                    />
                  </tbody>
                </table>
              </div>
            </div>
            <div class="toggles">
              <div class="toggles-item">
                <div class="text">
                  Deposit
                </div>
                <Toggle v-model="coinData.isDeposit" />
              </div>
              <div class="toggles-item">
                <div class="text">
                  Withdraw
                </div>
                <Toggle v-model="coinData.isWithdraw" />
              </div>
              <div class="toggles-item">
                <div class="text">
                  Memo
                </div>
                <Toggle v-model="coinData.isMemo" />
              </div>
              <div class="toggles-item">
                <div class="text">
                  Active
                </div>
                <Toggle v-model="coinData.isActive" />
              </div>
            </div>
          </div>

          <div class="coins-modal-block-form-info-coin-submit">
            <div
              class="coins-modal-block-form-info-coin-submit-item cancel"
              @click="closePopup"
            >
              Cancel
            </div>
            <div
              class="coins-modal-block-form-info-coin-submit-item save"
              @click="changeCoinInfo"
            >
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {MAIN_DOMAIN} from "../../../store/config";
import ChainsList from "./ChainsList";
import Toggle from '@vueform/toggle'
import CoinsService from '../../../services/coins.service'
import {mapGetters} from 'vuex';
import FileService from '../../../services/file.service'
import {STATUSES} from "../coinData";

export default {
  name: "CoinsEditModal",
  components: {Toggle, ChainsList},
  props: {
    data: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      domain: MAIN_DOMAIN,
      isChains: false,
      tableTh: STATUSES,
      file: '',
      coinData: {
        name: '',
        shotName: '',
        image: '',
        isActive: false,
        isMemo: false,
        userFee: '',
        tradeRound: '',
        priceRound: '',
        isDeposit: false,
        isWithdraw: false,
        rating: '',
        marketUrl: '',
        network: []
      },
    }
  },
  computed: {
    ...mapGetters({
      CoinNetworkData: 'getCoinNetwork',
    }),
  },
  mounted() {
    this.coinData = this.data;
    this.$store.dispatch('getCoinNetworkList', this.data.id);
  },
  methods: {
    closePopup() {
      this.$store.commit('setCoinData', null);
    },
    uploadFile(e) {
      const files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        return;
      }
      this.addImage(files[0]);
    },
    addImage(file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.file = file;
        this.uploadImage();
      };
      reader.readAsBinaryString(file);

    },
    uploadImage() {
      FileService.uploadFile(this.file).then((result) => {
        this.coinData.image = result.data.result;
      }).catch((error) => {
        console.error(error);
      })
    },
    changeCoinInfo() {
      const id = this.coinData.id;
      delete this.coinData.id;

      CoinsService.editCoin(id, this.coinData).then(() => {
        this.successPopup();
        this.closePopup();
      }).catch(() => {
        this.errorPopup();
      });
    },
    successPopup() {
      this.$store.commit('setSuccess', {
        name: 'Coin edit success',
        value: this.coinData,
      });
    },
    errorPopup() {
      this.$store.commit('setError', {
        name: 'Coin edit error',
        value: this.coinData,
      });
    },
  },
}
</script>

<style lang="scss">
@import "~@vueform/toggle/themes/default.css";
@import "../../../assets/styles/pages/coins/edit-coin";
</style>
