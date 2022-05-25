<template>
  <div
    class="custom-select"
    :tabindex="tabindex"
    @blur="open = false"
  >
    <div
      class="selected"
      :class="{ open: open }"
      @click="open = !open"
    >
      <div class="status">
        <div
          class="status-item"
          :class="className"
        >
          {{ valueModel }}
        </div>
      </div>
    </div>
    <div
      v-if="options.length"
      class="items"
      :class="{ selectHide: !open }"
    >
      <div class="item">
        <div
          v-if="isMobile()"
          class="title"
        >
          Status
          <span> {{ data.login }}</span>
        </div>
        <div
          v-for="(option, index) of options"
          :key="index"
          class="item-dropdown"
          :class="{
            'draft': option.name === 'Draft',
            'payment': option.name === 'Payment',
            'waiting': option.name === 'Waiting',
            'active': option.name === valueModel,
          }"
          @click="selectHandler(option)"
        >
          <div class="circle" />
          <div
            v-if="option.name"
            class="default"
            :class="{
              'mob-name': isMobile()
            }"
          >
            {{ option.name }}
            <mark-icon
              v-if="option.name === valueModel"
              class="mark-icon"
            />
          </div>
          <div
            v-if="option.name === null"
            class="non-default"
          >
            None
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkIcon from "../../../icons/markIcon";
import helperMixin from "../../../mixins/helper.mixin";

export default {
  name: "SelectStatus",
  components: {MarkIcon},
  mixins: [
    helperMixin
  ],
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    data: {
      type: Object,
      required: false,
      default: null,
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    valueInput: {
      type: Number,
      required: false,
      default: null,
    }
  },
  emits: ['change-select'],
  data() {
    return {
      open: false,
      valueModel: '',
      className: '',
    };
  },
  watch: {
    valueInput(value) {
      const status = this.getStatus(value);
      this.valueModel = status.name;
      this.className = status.className;
    }
  },
  mounted() {
    this.open = this.isOpen;
    const status = this.getStatus(this.valueInput);
    this.valueModel = status.name;
    this.className = status.className;
  },
  methods: {
    getStatus(status) {
      let name = '';

      switch (status) {
        case 0 :
          name = 'Draft';
          break;
        case 1 :
          name = 'Payment';
          break;
        case 2 :
          name = 'Waiting';
          break;
      }

      return {
        name: name,
        className: name.toLowerCase(),
      }
    },
    selectHandler(option) {
      this.valueModel = option.name;
      this.className = this.getStatus(option.status).className;
      this.open = false;

      this.$emit("change-select", {
        option: option,
        data: this.data,
      });
    },
  },
};
</script>

<style lang="scss">
@import "../../../assets/styles/pages/payments/partials/payment-custom-select";
</style>
