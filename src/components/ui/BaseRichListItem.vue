<template>
  <a class="list-group-item list-group-item-action cursor-pointer border-0 ps-1 pe-2 pt-4 pb-4 mb-1"
     :class="{'selected-item': selected}">
    <div v-long-press="250" @long-press="$emit('itemLongPress', id)" @click="$emit('itemClick', id)">
      <slot>
        <div class="d-flex align-items-start no-select">
          <div v-if="showImage" class="hover-container flex-shrink-0 me-4 cursor-pointer" @click.stop="$emit('itemImageClick', id)">
            <transition name="flip">
              <div class="" v-show="!selected">
                <img class="img" alt="img" :src="image ? image.trim() : generatedAvatar"/>
              </div>
            </transition>
            <transition name="flip">
              <div v-show="selected" class="overlay">
                <i class="hi hi-check" />
              </div>
            </transition>
          </div>
          <div class="flex-grow-1 ms-3">
            <small class="float-end">{{creationDateText}}</small>
            <h6 class="fw-bold">{{mainText}}</h6>
            <div class="" style="width: 100%; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
              <small class="">{{subText}}</small>
            </div>
            <small class="text-muted">{{mutedText}}</small>
          </div>
        </div>
      </slot>
    </div>

  </a>
</template>

<script>
import {generateAvatar, generateColorFromString} from "@/renderFunctions";

export default {
  name: "BaseRichListItem",
  props: {
    selected: {
      required: false,
      type: Boolean,
      default: false
    },
    mainText: {
      required: true,
      type: String
    },
    image: {
      required: false,
      type: String,
      default: ""
    },
    showImage: {
      type: Boolean,
      required: false,
      default: true
    },
    creationDateText: {
      required: false,
      type: String,
      default: ""
    },
    subText: {
      required: false,
      type: String,
      default: ""
    },
    mutedText: {
      required: false,
      type: String,
      default: ""
    }
  },
  emits: ["itemLongPress", "itemClick", "itemImageClick"],
  computed: {
    generatedAvatar(){
      const avatarText = this.mainText?.[0] ? this.mainText[0].toUpperCase() : ""
      const color = this.mainText ? generateColorFromString(this.mainText) : "#ffffff";
      return generateAvatar(avatarText, "white", color)
    }
  }
}
</script>

<style scoped>
.hover-container {
  position: relative;
  height: 3rem;
  width: 3rem;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  display: flex;
}
.img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  backface-visibility: hidden;
}

.overlay {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: var(--bs-primary); /* Black see-through */
  border-radius: 50%;
  opacity: 1;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
  color: white;
  display: flex;
  backface-visibility: hidden;
}
.flip-enter-from,
.flip-leave-to {
  transform: rotateY(180deg);
}
.flip-enter-active,
.flip-leave-active {
  transition: all 0.4s ease;
}
</style>