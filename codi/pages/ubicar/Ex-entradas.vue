<template>
  <v-container>
    <v-text-field
      label="Recherche"
      v-model="searchTerm"
      clearable
    ></v-text-field>

    <v-list>
      <v-subheader>Results</v-subheader>
      <v-list-item-group>
        <v-list-item v-for="result in results" :key="result.value">
          <v-list-item-title>{{ result.value }}</v-list-item-title>
          <v-list-item-subtitle>
            Entreda Index: {{ result.entredaIndex }}, Albaran Index:
            {{ result.albaranIndex }}, Reference Index:
            {{ result.referenceIndex }}, Ubication Index:
            {{ result.ubicationIndex }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      entredas: [
        // ... l'array "Entredas" que vous avez décrite
      ],
      searchTerm: "",
    };
  },

  computed: {
    results() {
      if (!this.searchTerm) {
        return [];
      }

      return this.searchByAlbaranReferenceUbication(
        this.entredas,
        this.searchTerm
      );
    },
  },

  methods: {
    searchByAlbaranReferenceUbication(entredas, searchTerm) {
      const result = [];

      // Parcourir chaque élément "Entredas"
      for (let i = 0; i < entredas.length; i++) {
        const albaran = entredas[i].albaran;

        // Parcourir chaque élément "albaran" de l'élément "Entredas"
        for (let j = 0; j < albaran.length; j++) {
          const reference = albaran[j].reference;

          // Parcourir chaque élément "reference" de l'élément "albaran"
          for (let k = 0; k < reference.length; k++) {
            const ubication = reference[k].ubication;

            // Parcourir chaque élément "ubication" de l'élément "reference"
            for (let l = 0; l < ubication.length; l++) {
              const value = ubication[l];

              // Vérifier si la valeur correspond au terme de recherche
              if (
                value &&
                value
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                result.push({
                  entredaIndex: i,
                  albaranIndex: j,
                  referenceIndex: k,
                  ubicationIndex: l,
                  value: value,
                });
              }
            }
          }
        }
      }

      return result;
    },
  },
};
</script>
