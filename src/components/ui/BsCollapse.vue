<template>
  <div class="collapse show" id="collapseDiv" ref="collapseDiv">
    <slot> </slot>
  </div>
</template>

<script>
import { Collapse } from "bootstrap";
export default {
  name: "BsCollapse",
  props: {
    initialClosed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ["close", "show"],
  data() {
    return {
      collapse: null,
      hidden: false
    };
  },
  methods: {
    close() {
      this.collapse.hide();
    },
    show() {
      this.collapse.show();
    },
    toggle() {
      this.collapse.toggle();
    },
    isHidden() {
      return this.hidden;
    }
  },
  watch: {
    show(newValue) {
      if (this.collapse !== null) {
        if (newValue) {
          this.collapse.show();
        } else {
          this.collapse.hide();
        }
      }
    }
  },
  mounted() {
    this.collapse = new Collapse(this.$refs.collapseDiv, { toggle: false });
    const c = this.$refs.collapseDiv;
    c.addEventListener("hide.bs.collapse", () => {
      this.$emit("close");
    });
    c.addEventListener("hidden.bs.collapse", () => {
      console.log("hidden");
      this.visible = false;
      this.hidden = true;
    });
    c.addEventListener("show.bs.collapse", () => {
      console.log("collapse show event");
      this.$emit("show");
      this.visible = true;
      this.hidden = false;
    });
    if(this.initialClosed){
      this.close()
    }
    //const collapses = document.querySelectorAll(".collapse");
    //collapses.forEach(c => {
    /*c.addEventListener('hide.bs.collapse', () => {
        this.$emit("close")
      })
      c.addEventListener('hidden.bs.collapse', () => {
        this.visible = false;
      })
      c.addEventListener('show.bs.collapse', () => {
        console.log("collapse show event")
        this.$emit("show")
        this.visible = true;
      })*/
    //})
  }
};
</script>

<style scoped></style>
