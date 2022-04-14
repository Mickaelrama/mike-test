<template>
  <div class="create-user">
    <div class="form-create-container">
      <h1>Créer un nouveau utilisateur</h1>
      <FormulateForm @submit="handleSubmit">
        <FormulateInput
          type="text"
          label="Nom d'utilisateur"
          name="username"
          placeholder="Nom d'utilisateur"
          validation="required"
          :validation-messages="{
            required: 'Champ obligatoire.',
          }"
          v-model="username"
        />
        <FormulateInput
          type="email"
          label="Adresse E-mail"
          name="email"
          placeholder="Adresse E-mail"
          validation="required|email"
          v-model="email"
        />
        <FormulateInput
          type="password"
          label="Mot de passe"
          name="password"
          placeholder="Mot de passe"
          validation="required"
          :validation-messages="{
            required: 'Champ obligatoire.',
          }"
          v-model="password"
        />
        <div class="button-save-container">
          <button type="submit" class="button-save" :disabled="loading">
            {{ loading ? "Chargement en cours..." : "Enregistrer" }}
          </button>
        </div>
      </FormulateForm>
    </div>
  </div>
</template>
<style lang="scss">
@import "../assets/styles/createUser.scss";
</style>
<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      const resp = await this.$store.dispatch("add_new_user", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      this.loading = false;
      if (!resp.errors) {
        this.$router.push("/home");
      } else {
        alert(
          "Veuillez bien verifier si le email et l'username sonts uniques."
        );
      }
    },
  },
};
</script>
