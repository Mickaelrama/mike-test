<template>
  <div class="home">
    <div class="header">
      <h1>Participez à un combat:</h1>
      <button class="button-standard" @click="handleClickAddCombat">
        {{ loading ? "Enregistrement en cours..." : "Créer un combat" }}
      </button>
    </div>
    <div class="combats-container">
      <CombatItem
        v-for="item in dispoMatches"
        :key="item._id"
        :combat="item"
        @click="handleClickCombatItem"
      />
      <p v-if="dispoMatches.length === 0">
        Créer un combat avec un autre utilisateur.
      </p>
    </div>
  </div>
</template>
<style lang="scss">
@import "../assets/styles/home.scss";
</style>
<script>
import CombatItem from "../components/combat-item/CombatItem.vue";

export default {
  components: {
    CombatItem,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    dispoMatches() {
      return this.$store.getters.getDispoMatches;
    },
    currentUser() {
      return this.$store.getters.getUser;
    },
  },
  mounted() {
    // fetch all dispo matches
    this.$store.dispatch("get_dispo_matches");
    this.$store.dispatch("set_current_match", null);
  },
  methods: {
    handleClickAddCombat() {
      this.loading = true;
      this.$store.dispatch("add_match").then((result) => {
        if (result) {
          alert("Le nouveau combat est ajouté.");
          this.loading = false;
        }
      });
    },
    handleClickCombatItem({ _id, domicile, exterieur }) {
      if (this.currentUser._id !== domicile._id && !exterieur) {
        this.$store.dispatch("join_match", _id);
      }
    },
  },
};
</script>
