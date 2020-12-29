<template>
  <v-app>
    <template>
      <v-card>
        <v-img height="190" src="./assets/dg.jpg">
          <v-row>
            <v-col cols="12" sm="12" class="text-center white--text">
              <h3>DG Solutions</h3>
            </v-col>
          </v-row>

          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <div absolute large icon v-on="on">
                <v-switch
                  flat
                  inset
                  loading="dark"
                  dense
                  v-model="$vuetify.theme.dark"
                  hide-details
                  color="black"
                />
              </div>
            </template>
            <span> White / Dark</span>
          </v-tooltip>
        </v-img>

        <!-- Este espaço aonde seram exibidos os componentes -->
        <router-view></router-view>

        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
        >
        </v-menu>
      </v-card>
    </template>
  </v-app>
</template>

<script>
export default {
  name: `chat`,
  props: {
    source: String,
  },

  data: () => ({
    menu: false,
  }),

  methods: {
    onLogout() {
      this.$store.dispatch("SET_TOKEN", null);
    },
  },
};
</script>
