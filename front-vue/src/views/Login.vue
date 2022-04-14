<template>
  <div class="login">
    <div class="login-from-container">
      <h1>LOGIN</h1>
      <FormulateForm @submit="handleSubmit">
        <FormulateInput
          type="text"
          label="Nom d'utilisateur ou e-mail*"
          name="usernameOrPassword"
          placeholder="Nom d'utilisateur ou e-mail"
          validation="required"
          :validation-messages="{
            required: 'Champ obligatoire.',
          }"
          v-model="usernameOrEmail"
        />
        <FormulateInput
          type="password"
          label="Mot de passe*"
          name="password"
          placeholder="Mot de passe*"
          validation="required"
          :validation-messages="{
            required: 'Champ obligatoire.',
          }"
          v-model="password"
        />
        <p>
          <router-link to="/create-user">Créer votre compte ici</router-link>
        </p>
        <div class="button-container">
          <button class="button-save" :disabled="loading">
            {{ loading ? "Chargement en cours..." : "LOGIN" }}
          </button>
        </div>
      </FormulateForm>
    </div>
  </div>
</template>
<style lang="scss">
@import "../assets/styles/login.scss";
</style>
<script>
export default {
  data() {
    return {
      usernameOrEmail: null,
      password: null,
      loading: false,
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      this.$store
        .dispatch("login", {
          usernameOrEmail: this.usernameOrEmail,
          password: this.password,
        })
        .then((result) => {
          if (result) {
            this.loading = false;
            this.$router.push("/home");
          } else {
            this.loading = false;
            alert("Mot de passe ou nom d'utilisateur incorrect.");
          }
        });
    },
  },
};
</script>
