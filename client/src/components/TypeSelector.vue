<template>
    <select class="type-select" v-model="selectType" @change="emits('sendType', selectType)">
        <option :disabled="defaultText !== 'All'" selected value="">{{ defaultText }}</option>
        <option value="happy">😆happy</option>
        <option value="love">❤️love</option>
        <option value="sad">😢sad</option>
        <option value="angry">😡angry</option>
    </select>
</template>
<script setup lang="ts">
    import { ref } from "vue"
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
