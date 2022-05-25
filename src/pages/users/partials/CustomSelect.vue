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
      {{ valueModel ? valueModel : 'Empty' }}
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
          :class="{
            'active': option.name === valueModel,
          }"
          @click="selectHandler(option)"
        >
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
import helperMixin from "../../../mixins/helper.mixin";
import MarkIcon from "../../../icons/markIcon";

export default {
  name: "CustomSelect",
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
      type: String,
      required: false,
      default: '',
    }
  },
  emits: ['change-select'],
  data() {
    return {
      open: false,
      valueModel: '',
    };
  },
  watch: {
    valueInput(value) {
      this.valueModel = value;
    }
  },
  mounted() {
    this.open = this.isOpen;
    this.valueModel = this.valueInput;
  },
  methods: {
    selectHandler(option) {
      this.valueModel = option.name;
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
@import "../../../assets/styles/components/custom-select";
</style>
