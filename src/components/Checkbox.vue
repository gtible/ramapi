<template>
  <label>
    <input
      :id="id"
      type="checkbox"
      :name="name"
      :value="value"
      :checked="checked"
      @click="clickFn"
      :label="label"
      :aria-label="label"
    />
    <span class="badge badgeFilter" :class="className">{{ label }}</span>
  </label>
</template>

<script lang="ts">
export default {
  name: "Checkbox",
  props: {
    id: String,
    name: String,
    value: String,
    checked: Boolean,
    clickFn: Function,
    className: String,
    label: String,
  },
};
</script>

<style scoped>
.badgeFilter {
  margin: 5px;
}
</style>
