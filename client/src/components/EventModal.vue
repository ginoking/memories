<template>
  <div class="event-modal">
    <el-dialog
      v-model="props.event"
      :class="props.event.type"
      :title="props.event.name"
      width="500"
      :before-close="close"
    >
      <p class="date">{{ moment(props.event.date).format('YYYY/MM/DD') }}</p>
      <div class="modal-content">
        <img v-if="event.image != ''" :src="props.event.image" alt="" />
      </div>
      <p class="des">{{ props.event.des }}</p>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import moment from 'moment'
interface EventObject {
  name: string
  des: string
  image: string
  date: string
  type: string
}
const store = useStore()
const props = defineProps<{
  event: EventObject
}>()
const emit = defineEmits(['close-modal'])
const close = () => {
  emit('close-modal', false)
  store.commit('setShowCreateBtn', true)
}
</script>

<style scoped>
:deep(.el-dialog__title) {
  color: #fff;
}

:deep(.el-dialog__headerbtn .el-dialog__close) {
  color: #fff;
}

:deep(.date) {
  color: #fff;
  margin-bottom: 10px;
  text-align: right;
  letter-spacing: 5px;
}

:deep(.des) {
  color: #fff;
  margin-top: 25px;
}

:deep(.happy) {
  background-color: #d7d73b;
}

:deep(.love) {
  background-color: pink;
}

:deep(.angry) {
  background-color: #ab5656;
}

:deep(.sad) {
  background-color: #5682aa;
}

:deep(.modal-content) {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.modal-content img) {
  max-width: 70%;
  border-radius: 10px;
  --s: 7.5px;
  /* size of the frame */
  --b: 2px;
  /* border thickness */
  --w: 20px;
  /* width of the image */
  --c: #fff;
  object-fit: cover;
  padding: calc(2 * var(--s));
  --_g: var(--c) var(--b), #0000 0 calc(100% - var(--b)), var(--c) 0;
  background: linear-gradient(var(--_g)) 50%/100% var(--_i, 100%) no-repeat,
    linear-gradient(90deg, var(--_g)) 50% / var(--_i, 100%) 100% no-repeat;
  outline: calc(var(--w) / 2) solid #0009;
  outline-offset: calc(var(--w) / -2 - 2 * var(--s));
  transition: 0.4s;
  cursor: pointer;
}

:deep(.modal-content img:hover) {
  outline: var(--b) solid var(--c);
  outline-offset: calc(var(--s) / -2);
  --_i: calc(100% - 2 * var(--s));
}
</style>
