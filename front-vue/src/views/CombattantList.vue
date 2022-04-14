<template>
  <div class="combattants">
    <div class="header">
      <h1>Les combattants:</h1>
      <button class="button-standard" @click="handleAddCombattant">
        Ajouter un combattant
      </button>
    </div>
    <h2>Votre combattant: {{ choosenCombattanName }}</h2>
    <div class="create-combattant-form-container" v-if="openAddForm">
      <div class="create-combattant-form">
        <div class="fermer-btn" @click="handleClickCloseForm">fermer</div>
        <FormulateForm @submit="handleSubmitAddForm">
          <FormulateInput
            type="text"
            label="Nom"
            name="nom"
            placeholder="nom"
            validation="required"
            :validation-messages="{
              required: 'Champ obligatoire.',
            }"
            v-model="nom"
          />
          <FormulateInput
            type="number"
            label="HP"
            name="HP"
            placeholder="HP"
            validation="required|max:100"
            :validation-messages="{
              required: 'Champ obligatoire.',
            }"
            v-model="HP"
          />
          <FormulateInput
            type="number"
            label="MP"
            name="MP"
            placeholder="MP"
            validation="required|max:100"
            :validation-messages="{
              required: 'Champ obligatoire.',
            }"
            v-model="MP"
          />
          <FormulateInput
            type="number"
            label="ST"
            name="ST"
            placeholder="ST"
            validation="required|max:100"
            :validation-messages="{
              required: 'Champ obligatoire.',
            }"
            v-model="ST"
          />
          <button class="button-save" :disabled="loading">
            {{ loading ? "Enregistrement en cours" : "Enregistrement" }}
          </button>
        </FormulateForm>
      </div>
    </div>
    <div class="combattants-list">
      <CombattantItem
        v-for="combattant in combattants"
        :key="combattant._id"
        :combattant="combattant"
        @click="handleClickCombattant"
        :disabled="disabled"
      />
    </div>
  </div>
</template>
<style lang="scss">
@import "../assets/styles/combattants.scss";
</style>
<script>
import CombattantItem from "../components/combattant-item/CombattantItem.vue";

export default {
  components: { CombattantItem },
  data() {
    return {
      //form data
      nom: "",
      HP: null,
      MP: null,
      ST: null,
      //////////
      openAddForm: false,
      loading: false,
      disabled: false,
      choosenCombattanName: "",
    };
  },
  computed: {
    combattants() {
      return this.$store.getters.getCombattants;
    },
    currentMatch() {
      return this.$store.getters.getCurrentMatch;
    },
    currentCombat() {
      return this.$store.getters.getCurrentCombat;
    },
  },
  watch: {
    currentCombat(value) {
      // when all users have choosen
      if (value?.playerOne && value?.playerTwo) {
        this.$router.push("/combat");
      }
    },
  },
  mounted() {
    if (!this.currentMatch) {
      this.$router.push("/");
    }
    this.$store.dispatch("get_combattants");
    if (this.currentCombat) {
      this.$store.dispatch("set_current_combat", {
        ...this.currentCombat,
        playerOne: null,
        playerTwo: null,
      });
    }
  },
  methods: {
    handleAddCombattant() {
      this.openAddForm = true;
    },
    handleClickCloseForm() {
      this.openAddForm = false;
    },
    handleSubmitAddForm() {
      this.loading = true;
      this.$store
        .dispatch("add_combattant", {
          nom: this.nom,
          HP: parseFloat(this.HP),
          MP: parseFloat(this.MP),
          ST: parseFloat(this.ST),
        })
        .then(() => {
          this.loading = false;
          this.openAddForm = false;
        });
    },
    handleClickCombattant(combattant) {
      if (this.currentCombat) {
        this.$store.dispatch("join_combat", combattant);
      } else {
        this.$store.dispatch("add_combat", combattant);
      }
      this.choosenCombattanName = combattant.nom;
    },
  },
};
</script>
