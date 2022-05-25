<template>
  <div class="paged-pagination">
    <div class="paged-pagination-block">
      <div
        class="paged-pagination-block-arrows"
        :class="{disabled: total === current}"
      >
        <div class="arrows">
          <arrow-prev
            class="arrow-prev arrows-item"
            @click="prevPage"
          />
          <div
            v-if="pages"
            class="pages"
          >
            <div
              v-for="(item, index) in pages.data"
              :key="index"
              class="pages-item"
              :class="{active: item === page}"
              @click="changePerPage(item)"
            >
              <span>{{ item }}</span>
            </div>
            <div
              v-if="page+1 < total"
              class="pages-item"
            >
              ...
            </div>
            <div
              v-if="page+1 < total"
              class="pages-item"
              @click="changePerPage(total)"
            >
              {{ total }}
            </div>
          </div>
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

export default {
  name: "PagedPagination",
  components: {ArrowNext, ArrowPrev},
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
  emits: [
    'next-page',
    'prev-page',
    'change-page'
  ],
  data() {
    return {
      page: 1,
      pages: null,
    }
  },
  mounted() {
    this.page = this.current;
    this.calculatePagination(this.page);
  },
  methods: {
    changePerPage(page) {
      this.page = page;
      this.$emit('change-page', page);
      this.calculatePagination(this.page);
    },
    prevPage() {
      if (this.page > 1) {
        this.page = this.page - 1;
        this.$emit('prev-page', this.page);
      }
      this.calculatePagination(this.page);
    },
    nextPage() {
      if (this.page < this.total) {
        this.page = this.page + 1;
        this.$emit('next-page', this.page);
        this.calculatePagination(this.page);
      }
    },
    calculatePagination(currentPage = 1, pageSize = 3, maxPages = 3) {
      let totalPages = this.total;

      if (currentPage < 1) {
        currentPage = 1;
      } else if (currentPage > totalPages) {
        currentPage = totalPages;
      }

      let startPage, endPage;
      if (totalPages <= maxPages) {
        startPage = 1;
        endPage = totalPages;
      } else {
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
          startPage = 1;
          endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
          startPage = totalPages - maxPages + 1;
          endPage = totalPages;
        } else {
          startPage = currentPage - maxPagesBeforeCurrentPage;
          endPage = currentPage + maxPagesAfterCurrentPage;
        }
      }

      let startIndex = (currentPage - 1) * pageSize;
      let endIndex = Math.min(startIndex + pageSize - 1, totalPages - 1);
      let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

      this.pages = {
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        data: pages
      };
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/components/pagination";
</style>
