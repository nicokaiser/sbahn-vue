<script setup>
defineProps({
    line: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <span
        class="line-logo"
        :style="`background-color: ${line.color}; color: ${line.textColor || line.text_color}`"
    >
        {{ line.name }}
    </span>
</template>
