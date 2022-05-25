<template>
  <svg
    viewBox="0 0 36 36"
    class="circular-chart"
  >
    <path
      class="circle-bg"
      d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path
      class="circle"
      :stroke-dasharray="stroke"
      d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <text
      x="18"
      y="23"
      class="percentage"
    >{{ timerCount }}
    </text>
  </svg>
</template>

<script>
export default {
  name: "CircleIcon",
  props: {
    timerCount: {
      type: Number,
      default: 0,
    },
    stroke: {
      type: String,
      default: '60, 100'
    },
  }
}
</script>

<style lang="scss">
.circular-chart {
  display: block;
  margin: 0 auto;
  max-width: 80%;
  max-height: 250px;

  .circle {
    stroke: white;
  }
}

.circle-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.12);
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: progress 3s ease-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0, 100;
  }
}

.percentage {
  fill: #f3f4f5;
  font-size: 14px;
  line-height: 0;
  text-anchor: middle;
}
</style>
