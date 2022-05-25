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
          <span> ID {{ data.id }}</span>
        </div>
        <div
          v-for="(option, index) of options"
          :key="index"
          class="item-dropdown"
          :class="{
            'empty': option.name === 'Remaining',
            'pay': option.name === 'Pay',
            'exchange': option.name === 'Exchange',
            'completed': option.name === 'Completed',
            'overdue': option.name === 'Overdue',
            'returned': option.name === 'Returned',
            'active': option.name === valueModel && isMobile(),
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
              v-if="option.name === valueModel && isMobile()"
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
import filterMixin from "../../../mixins/filter.mixin";
import helperMixin from "../../../mixins/helper.mixin";
import MarkIcon from "../../../icons/markIcon";

export default {
  name: "SelectStatusExchange",
  components: {MarkIcon},
  mixins: [
    filterMixin,
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
      default: 0,
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
      return this.getExchangeStatus(status);
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

</style>
