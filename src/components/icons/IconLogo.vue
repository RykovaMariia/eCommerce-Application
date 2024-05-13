<script lang="ts" setup>
const props = defineProps<{
  isWhile?: boolean
}>()
</script>
<template>
  <svg
    class="logo"
    :class="{ logo_while: props.isWhile }"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="414.187"
    height="420.594"
    viewBox="0 0 414.187 420.594"
  >
    <defs>
      <filter
        id="filter"
        x="256.844"
        y="103.406"
        width="240.718"
        height="297.188"
        filterUnits="userSpaceOnUse"
      >
        <feFlood result="flood" />
        <feComposite result="composite" operator="in" in2="SourceGraphic" />
        <feBlend result="blend" in2="SourceGraphic" />
      </filter>
    </defs>

    <text id="GREEN_CITY" data-name="GREEN CITY" class="green-city" x="205.852" y="378.68">
      GREEN CITY
    </text>
    <text id="eco_goods" data-name="eco goods" class="eco-goods" x="200.853" y="412.681">
      eco goods
    </text>
    <g transform="translate(-85.375 -101.406)" style="filter: url('#filter')">
      <path
        id="path"
        class="left"
        d="M468,104c24.652,1.886,27.844,47.932,29,87,1.087,36.742-12.916,101.258-43,134-30.058,32.713-61.462,53.792-84,63-15.695,6.413-64.372,19.235-69,7-3.5-9.258,6.8-30.321,33-76,15.329-26.723,26.14-35.394,38-52,10.6-14.838,23.8-30.955,17-35s-32.561,26.923-40,35-26.653,33.814-32,41c-7.014,9.425-18.047,30.908-21,41-3.491,11.932-5.273,27.292-12,29-5.624,1.428-15.423-13.84-20-30-4.567-16.124-9.2-40.872-5-66s14.47-41.088,27-57c10.524-13.364,36.01-33.094,49-41s54.893-32.894,68-42S443.348,102.114,468,104Z"
        style="filter: none; fill: inherit; stroke: inherit"
      />
    </g>
    <use transform="translate(-85.375 -101.406)" xlink:href="#path" class="right-stroke" />
    <path
      class="cls-4"
      d="M97,111c13.117-5.613,29.361,8.491,42,15,16.367,8.428,27.77,14.872,47,22,21,7.786,38.838,17,54,34,10.221,11.457,17.972,32.75,18,52,0.017,11.408-.851,32.425-7,36-4.47,2.6-11.764-10.3-20-23-6.342-9.782-16.051-18.613-29-30-12.529-11.018-17.622-13.854-30-21-10.041-5.8-17.206-11.167-20-7s6.513,14.805,12,19,21.293,19.586,29,28,18.938,18.947,26,27,19.293,20.665,16,30c-2.162,6.13-20.857,4.114-32,3-10.42-1.042-39.523-10.279-61-26-21.523-15.755-30.966-30.287-39-47-8.623-17.939-14.376-41.7-15-59C87.3,144.666,89.082,114.388,97,111Z"
      transform="translate(-85.375 -101.406)"
    />
  </svg>
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';

.green-city {
  font-size: 62.5px;
}

.green-city,
.eco-goods {
  font-weight: 700;
  text-anchor: middle;
  fill: constants.$color-logo;
}

.eco-goods {
  font-size: 37.5px;
}

.left,
.cls-4 {
  fill: constants.$color-primary;
  fill-rule: evenodd;
  stroke-linejoin: round;
  stroke-width: 4px;
}

.left {
  filter: url('#filter');
  stroke: constants.$color-logo;
}

.cls-4 {
  stroke: constants.$color-primary;
}

.right-stroke {
  filter: none;
  fill: constants.$color-logo;
  stroke: constants.$color-logo;
}

.logo {
  user-select: none;
  width: 4rem;
  height: 4rem;
}

.logo_while {
  width: 2rem;
  height: 2rem;
}

.logo_while .green-city,
.logo_while .eco-goods {
  fill: constants.$color-text-light;
}

.logo_while .left,
.logo_while .cls-4 {
  fill: constants.$color-text-light;
  stroke: constants.$color-text-light;
}

.logo_while .right-stroke {
  filter: none;
  fill: constants.$color-text-light;
  stroke: constants.$color-text-light;
}
</style>
