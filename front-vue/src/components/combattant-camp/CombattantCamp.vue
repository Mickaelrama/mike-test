<template>
  <div class="combattant-camp">
    <div class="container-name">
      <div class="nom-combattant">{{ combattantStore.nom }}</div>
    </div>
    <div v-if="winner === user" class="winner-declaration">You win !!!</div>
    <div
      class="button-commande-container"
      v-if="showActionBtn && !winner"
    >
      <button class="button-save" @click="handleClickAttack('FRAPPER')">
        Frapper
      </button>
      <button class="button-standard" @click="handleClickAttack('LANCER_SORT')">
        Lancer sort
      </button>
    </div>
    <div class="health-contaier">{{ currentHealth }}</div>
  </div>
</template>
<style lang="scss">
@import "./combattantCamps.scss";
</style>
<script>
export default {
  props: {
    combattant: String,
    currentHealth: Number,
    user: String,
    attackedPlayer: String,
    winner: String,
  },
  data() {
    return {};
  },
  computed: {
    combattantStore() {
      const allCombattants = this.$store.getters.getCombattants;
      return allCombattants.find(({ _id }) => _id === this.combattant);
    },
    showActionBtn() {
      const currentUser = this.$store.getters.getUser;
      return currentUser._id === this.user;
    },
    currentCombat() {
      return this.$store.getters.getCurrentCombat;
    },
    currentMatch() {
      return this.$store.getters.getCurrentMatch;
    },
  },
  methods: {
    handleClickAttack(action) {
      this.$store.dispatch("attack", {
        _id: this.currentCombat._id,
        action,
        combattant: this.combattant,
        match: this.currentMatch,
        domicile: this.currentCombat.domicile,
        exterieur: this.currentCombat.exterieur,
        attackedPlayer: this.attackedPlayer,
      });
    },
  },
};
</script>
