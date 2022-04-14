<template></template>
<script>
import { io } from "socket.io-client";

let socket = io(process.env.VUE_APP_API_URL);

export default {
  computed: {
    currentUserId() {
      return this.$store.getters.getUser._id;
    },
    currentMatch() {
      return this.$store.getters.getCurrentMatch;
    },
    token() {
      return this.$store.getters.getToken;
    },
    currentCombat() {
      return this.$store.getters.getCurrentCombat;
    },
  },
  mounted() {
    // when a new match is created
    socket.on("NEW_MATCH", () => {
      this.$store.dispatch("get_dispo_matches");
    });

    // joined match
    socket.on("JOINED_MATCH", ({ exterieur, domicile, _id }) => {
      if (
        (this.currentUserId === exterieur || this.currentUserId === domicile) &&
        !this.currentMatch
      ) {
        this.$store.dispatch("set_current_match", _id);
        this.$router.push("/combattants");
      }
    });

    socket.on("NEW_COMBATTANT", () => {
      this.$store.dispatch("get_combattants");
    });

    socket.on("CREATED_COMBAT", (args) => {
      if (
        this.currentUserId === args.domicile ||
        this.currentUserId ||
        args.exterieur
      ) {
        this.$store.dispatch("set_current_combat", args);
      }
    });

    const updateCurrentCombat = (args) => {
      if (
        this.currentUserId === args.domicile ||
        this.currentUserId ||
        args.exterieur
      ) {
        this.$store.dispatch("set_current_combat", {
          ...this.currentCombat,
          ...args,
        });
      }
    };

    socket.on("JOINED_COMBAT", (args) => {
      updateCurrentCombat(args);
    });

    socket.on("ATTACKED", (args) => {
      updateCurrentCombat(args);
    });
  },
};
</script>
