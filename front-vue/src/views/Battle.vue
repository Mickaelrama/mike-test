<template>
  <div class="battle">
    <div class="replay-combat" v-if="winner">
      <router-link to="/combattants" class="button-save"
        >Rejouer encore</router-link
      >
      <router-link to="/home" class="button-save">Créer un nouveau</router-link>
    </div>
    <div class="container">
      <div class="player-one">
        <CombattantCamp
          :combattant="currentCombat.playerOne"
          :currentHealth="currentCombat.playerOneHealth"
          :user="currentCombat.domicile"
          attackedPlayer="playerTwo"
          :winner="winner"
        />
      </div>
      <div class="player-two">
        <CombattantCamp
          :combattant="currentCombat.playerTwo"
          :currentHealth="currentCombat.playerTwoHealth"
          :user="currentCombat.exterieur"
          attackedPlayer="playerOne"
          :winner="winner"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "../assets/styles/battle.scss";
</style>
<script>
import CombattantCamp from "../components/combattant-camp/CombattantCamp.vue";
export default {
  components: {
    CombattantCamp,
  },
  data() {
    return {
      winner: null,
    };
  },
  computed: {
    currentCombat() {
      return this.$store.getters.getCurrentCombat;
    },
    currentMatch() {
      return disponibleMatch.find(({ _id }) => _id === currentMatchId);
    },
  },
  watch: {
    currentCombat(value) {
      this.winner =
        value.playerOneHealth <= 0
          ? value.exterieur
          : value.playerTwoHealth <= 0
          ? value.domicile
          : null;
    },
  },
};
</script>
