<template>
    <select class="type-select" v-model="selectType" @change="emits('sendType', selectType)">
        <option :disabled="defaultText !== 'All'" selected value="">{{ defaultText }}</option>
        <option v-for="emoji in emojis" :key="emoji.key" :value="emoji.key">{{ emoji.text }}</option>
    </select>
</template>
<script setup lang="ts">
    import { ref } from "vue"
    import emojis from "../helpers/emojis"
    const selectType = ref('');

    const emits = defineEmits(['sendType']);
    const props = defineProps({
        defaultText: {
            type: String,
            required: true
        }
    });
</script>
<style scoped>
</style>
