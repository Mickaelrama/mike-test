<template>
  <div class="combattant-item" @click="handleClick">
    <ul>
      <li>{{ combattant.nom }}</li>
      <li>HP: {{ combattant.HP }}</li>
      <li>MP: {{ combattant.MP }}</li>
      <li>ST: {{ combattant.ST }}</li>
    </ul>
  </div>
</template>
<style lang="scss">
@import "./combattantItem.scss";
</style>
<script>
export default {
  props: {
    combattant: Object,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit("click", this.combattant);
      }
    },
  },
};
</script>
