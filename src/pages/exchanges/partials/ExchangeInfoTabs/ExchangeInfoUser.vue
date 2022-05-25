<template>
  <div
    v-if="uidData"
    class="exchange-info-form-inputs-block"
  >
    <div class="exchange-info-form-info-block-item">
      <div class="exchange-info-form-info-block-item-main">
        <div class="desc">
          Browser
        </div>
        <div
          class="data"
        >
          {{ uidData.browserDetails.browserName }}
        </div>
      </div>
      <div class="exchange-info-form-info-block-item-main">
        <div class="desc">
          Device
        </div>
        <div
          class="data"
        >
          {{ uidData.browserDetails.device }}
        </div>
      </div>
    </div>
    <div class="exchange-info-form-info-block-item">
      <div class="exchange-info-form-info-block-item-main">
        <div class="desc">
          Location
        </div>
        <div
          class="data"
        >
          {{ uidData.ipLocation.country.code }}, {{ uidData.ipLocation.country.name }}, {{ uidData.ipLocation.city.name }}
        </div>
      </div>
      <div class="exchange-info-form-info-block-item-main">
        <div class="desc">
          IP
        </div>
        <div
          class="data"
        >
          {{ uidData.ip }}
        </div>
      </div>
    </div>
    <div class="exchange-info-form-info-block">
      <div class="exchange-info-form-info-block-item">
        <div class="exchange-info-form-info-block-item-block">
          <div class="desc">
            User ID
          </div>
          <div
            class="data"
          >
            {{ data.uid }}
          </div>
        </div>
      </div>
      <div class="exchange-info-form-info-block-item">
        <div class="exchange-info-form-info-block-item-block">
          <div class="desc">
            Data and time
          </div>
          <div
            class="data"
          >
            {{ uidData.time }}
          </div>
        </div>
      </div>
      <div class="exchange-info-form-info-block-item">
        <div class="exchange-info-form-info-block-item-block">
          <div class="desc">
            URL
          </div>
          <div
            class="data"
          >
            {{ uidData.url }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FpjsService from "@/services/fpjs.service";

export default {
  name: "ExchangeInfoUser",
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      uidData: null
    }
  },
  mounted() {
    this.getUuidData();
  },
  methods: {
    getUuidData() {
      if (this.data.uuid2){
        FpjsService.getVisitor(this.data.uuid2).then((res) => {
          this.uidData = res.data.visits.sort((a, b) => a.time - b.time).shift();
        });
      }
    },
  }
}
</script>

<style scoped>

</style>
