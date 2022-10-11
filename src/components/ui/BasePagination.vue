<template>
  <div class="">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" @click="goToPage(1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click="goToPage(value - 1)">
          <span aria-hidden="true">&lsaquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{ active: i === value }"
        v-for="i in directPageButtons"
        :key="i"
      >
        <a class="page-link" href="#" @click="goToPage(i)">{{ i }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click="goToPage(value + 1)">
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click="goToPage(pages)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BasePagination",
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    firstButtonAltText: {
      type: String,
      required: false,
      default: "First"
    },
    lastButtonAltText: {
      type: String,
      required: false,
      default: "Last"
    },
    perPage: {
      type: Number,
      required: false,
      default: 10
    },
    value: {
      type: Number,
      required: true
    }
  },
  emits: ["input"],
  data() {
    return {
      page: 1
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
    directPageButtons() {
      const buttonsBeforeCurrent = 1;
      const buttonsAfterCurrent = 2;
      const directButtons = [];
      for (
        let i = Math.max(1, this.page - buttonsBeforeCurrent);
        i < this.page;
        i++
      ) {
        directButtons.push(i);
      }
      for (
        let i = this.page;
        i <= Math.min(this.page + buttonsAfterCurrent, this.pages);
        i++
      ) {
        directButtons.push(i);
      }
      return directButtons;
    }
  },
  methods: {
    prevPage() {
      this.page = this.clamp(this.page - 1, 1, this.pages);
    },
    nextPage() {
      this.page = this.clamp(this.page + 1, 1, this.pages);
    },
    clamp(num, min, max) {
      return Math.min(Math.max(num, min), max);
    },
    goToPage(page) {
      if (page > 0 && page <= this.pages) {
        this.$emit("input", page);
      }
    }
  }
};
</script>

<style scoped></style>
