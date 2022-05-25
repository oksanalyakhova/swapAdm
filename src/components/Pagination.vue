<template>
  <div class="table-pagination">
    <div class="table-pagination-block">
      <div
        class="table-pagination-block-select"
      >
        Rows per page:
        <div
          class="pages-length"
          @click="isRows = !isRows"
        >
          <div class="pages-length-default">
            {{ currentPerPage }}
            <dropdown />
          </div>
          <div
            v-if="isRows"
            class="pages-length-dropdown"
          >
            <div
              v-for="(item, index) in perPageData"
              :key="index"
              class="item"
              @click="changePerPage(item)"
            >
              <span v-if="currentPerPage !== item">
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="table-pagination-block-arrows"
        :class="{disabled: total === page+1}"
      >
        <span>
          {{ page + 1 }}-{{ total }} of {{ current }}
        </span>
        <div class="arrows">
          <arrow-prev
            class="arrow-prev arrows-item"
            @click="prevPage"
          />
          <arrow-next
            class="arrow-next arrows-item"
            @click="nextPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowPrev from "../icons/arrowPrev";
import ArrowNext from "../icons/arrowNext";
import Dropdown from "../icons/dropdown";

export default {
  name: "Pagination",
  components: {Dropdown, ArrowNext, ArrowPrev},
  props: {
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    current: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  emits: ['next-page', 'prev-page', 'change-page'],
  data() {
    return {
      page: 0,
      currentPerPage: 8,
      perPageData: [
        8, 16, 32
      ],
      isRows: false,
    }
  },
  methods: {
    changePerPage(item) {
      this.page = 0;
      this.currentPerPage = item;
      this.$emit('change-page', item);
    },
    prevPage() {
      if (this.page + 1 > 1) {
        this.page = this.page - 1;
        this.$emit('prev-page', this.page);
      }
    },
    nextPage() {
      if (this.page + 1 < this.total) {
        this.page = this.page + 1;
        this.$emit('next-page', this.page);
      }
    },
  }
}
</script>

<style lang="scss">
@import "../assets/styles/components/pagination";
</style>
