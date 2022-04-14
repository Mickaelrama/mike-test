<template>
  <div :class="{ 'combat-item': true, ready }" @click="handleClick">
    <div>
      <div class="user-interne">
        {{ combat.domicile.username }}
      </div>
      <div>VS</div>
      <div class="user-externe">
        {{ combat.exterieur ? combat.exterieur.username : "En attente ..." }}
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "./combatItem.scss";
</style>
<script>
export default {
  props: {
    combat: Object,
  },
  computed: {
    ready() {
      return this.combat.exterieur && this.combat.domicile ? true : false;
    },
  },
  methods: {
    handleClick() {
      this.$emit("click", this.combat);
    },
  },
};
</script>
