<script setup>
import { computed, ref, onMounted, onUnmounted, watch, toRaw } from 'vue';
import * as L from 'leaflet';
import { useOptionsStore } from '../stores/options';

const defaultCoordinates = [47.9052567, 11.3084582]; // Starnberger See als "Fallback"

const props = defineProps({
    map: {
        type: Object,
        required: true,
    },

    train: {
        type: Object,
        required: true,
    },
});

const options = useOptionsStore();
const svg = ref();
let mapMarker;

onMounted(() => {
    mapMarker = L.marker([0, 0], {
        icon: L.divIcon({
            html: svg.value,
            className: 'train-marker',
            iconSize: [50, 50],
            iconAnchor: [25, 25],
        }),
        opacity: 0.75,
        keyboard: false,
        interactive: false,
    });

    mapMarker.setLatLng(toRaw(props.train.coordinates) || defaultCoordinates);
    mapMarker.addTo(toRaw(props.map));
});

watch(
    () => props.train.coordinates,
    () => {
        mapMarker.setLatLng(toRaw(props.train.coordinates) || defaultCoordinates);
    }
);

onUnmounted(() => {
    mapMarker.remove();
});

const isSelected = computed(() => {
    return options.trains.includes(props.train.id);
});

// TODO: train.heading
// TODO: train.historyPath
// TODO: train.estimatedPath

// TODO: https://github.com/Leaflet/Leaflet/issues/7017
</script>

<template>
    <div style="display: none">
        <svg
            ref="svg"
            :class="[isSelected ? 'is-selected' : null]"
            viewBox="0 0 10 10"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g :class="['container', !train.isActive ? 'inactive' : null]">
                <g class="marker" :style="`fill: ${train.line.color}`">
                    <circle cy="5" cx="5" r="3" />
                    <!--
                    <path
                        class="heading"
                        d="m 8,3.5 c 0.5692502,0.3737847 0.6334476,2.5249143 0,3 l 2,-1.5 z"
                        transform="rotate(0, 0, 0)"
                    />
                    -->
                    <circle
                        v-if="!train.hasGpsCordinates"
                        class="no-gps-cordinates"
                        cy="2.5"
                        cx="5"
                        r="1"
                    />
                </g>
                <text
                    class="name"
                    :style="`fill: ${train.line.textColor}`"
                    x="2.8"
                    y="6.2"
                    textLength="4.5"
                    lengthAdjust="spacingAndGlyphs"
                >
                    {{ train.line.name }}
                </text>
            </g>
        </svg>
    </div>
</template>

<style scoped>
.train-marker .container {
    cursor: pointer;
    pointer-events: visiblePainted;
}
.train-marker .container.inactive {
    transform: scale(0.7);
    transform-origin: center;
    opacity: 0.6;
}
.train-marker .marker {
    stroke: #ffffff;
    stroke-width: 0.3;
}
.train-marker .no-gps-cordinates {
    fill: #ff4f4f;
}
.train-marker .no-gps-cordinates.hide {
    display: none;
}
.train-marker .is-selected .marker {
    stroke: #406fff;
}
.train-marker .heading.is-unknown {
    display: none;
}
.train-marker .name {
    font: bold 3px sans-serif;
}
</style>
