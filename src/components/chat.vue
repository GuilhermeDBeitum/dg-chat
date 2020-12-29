<template>
  <v-card height="400">
    <v-container>
      <div class="overflow-hidden">
        <v-btn
          color="primary"
          width="28"
          height="28"
          fab
          dark
          absolute
          right
          @click="active = !active"
        >
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
        <v-bottom-navigation v-model="value" :input-value="active" fixed right>
          <v-card
            autocomplete="off"
            solo-inverted
            class="mx-auto pa-4 subtitle-2 text-center "
            height="180"
            width="500"
          >
            <h4>
              <v-btn disabled width="100">
                <v-card height="12" class="d-flex justify-center"
                  >{{ connections + 1 }} connections</v-card
                >
              </v-btn>
            </h4>
          </v-card>
        </v-bottom-navigation>
      </div>

      <v-row justify="space-around">
        <v-btn
          @click="voltar()"
          class="d-flex justify-center"
          fab
          dark
          width="26"
          height="26"
          color="primary"
          left
          absolute
        >
          <v-icon dark>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
          class="d-flex flex-row-reverse"
          fab
          dark
          small
          color="primary"
          width="22"
          height="22"
          @click="limparBox"
          >X</v-btn
        ></v-row
      >
      <v-row>
        <v-col cols="12" justify="space-around">
          <v-hover>
            <template v-slot="{ hover }">
              <v-card
                autocomplete="off"
                solo-inverted
                :elevation="hover ? 24 : 6"
                class="mx-auto pa-4 message_card subtitle-2 text-center "
                height="210"
                width="520"
              >
                <v-card-text class="mx-auto pa-4 message_card subtitle-2">
                  <div class="col-lg-8 offset-lg-2">
                    <div v-if="ready">
                      <p v-for="(msg, index) in info" :key="index">
                        {{ msg.username }} {{ msg.type }}
                      </p>
                    </div>

                    <ul class="list-group list-group-flush text-right">
                      <small v-if="typing" class="text-white"
                        >{{ typing }} is typing</small
                      >
                      <div
                        class="list-group-item"
                        v-for="(user, index) in messages"
                        :key="index"
                      >
                        <v-card class="col-lg-11 offset-lg-12">
                          <span :class="{ 'float-left ': message.type === 1 }">
                            {{ user.message }}
                            <small class="primary--text"
                              >:{{ user.user }}</small
                            >
                          </span></v-card
                        >
                      </div>
                    </ul>
                  </div>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>

          <v-row align="center" justify="space-around">
            <v-col cols="12" sm="5">
              <form @submit.prevent="send">
                <v-text-field
                  app
                  autocomplete="off"
                  v-model="newMessage"
                  :append-outer-icon="newMessage ? 'mdi-send' : 'mdi-send'"
                  solo
                  clear-icon="mdi-close-circle"
                  clearable
                  label="Digite uma mensagem..."
                  type="text"
                  @click:append-outer="send"
                  height="40"
                  rounded
                ></v-text-field>
              </form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
// import socket from "vue-socket.io";
export default {
  props: ["userID"],
  name: `chat`,

  data: () => ({
    active: true,
    contact: false,
    isConnected: false,
    typing: false,
    ready: false,
    username: "",
    message: "",
    socketMessage: "",
    newMessage: "",
    print: [],
    messages: [],
    info: [],
    value: 1,
    connections: 0,
  }),

  methods: {
    limparBox() {
      this.messages = [];
    },
    voltar() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },

    created() {
      let { userID } = this.$route.params;
      if (userID in this.$store.state.directMessages) {
        this.$store.dispatch("clearNotifications", userID);
      }
    },

    send() {
      if (!this.newMessage == "") {
        // eslint-disable-next-line no-console
        this.username = this.$store.state.modlogin.name;

        this.messages.push({
          message: this.newMessage,
          type: 0,
          user: this.username,
        });

        this.newMessage = "";

        // socket.emit("chat-message", {
        //   message: this.newMessage,
        //   user: this.username,
        // });
        this.newMessage = null;
      }
    },

    // addUser() {
    //   this.ready = true;
    //   socket.emit("joined", this.username);
    // },
  },

  // watch: {
  //   newMessage(value) {
  //     value ? socket.emit("typing", this.username) : socket.emit("stopTyping");
  //   },
  // },

  // created() {
  //   window.onbeforeunload = () => {
  //     socket.emit("leave", this.username);
  //   };

  //   socket.on("chat-message", (data) => {
  //     this.messages.push({
  //       message: data.message,
  //       type: 1,
  //       user: data.user,
  //     });
  //   });

  //   socket.on("typing", (data) => {
  //     this.typing = data;
  //   });

  //   socket.on("stopTyping", () => {
  //     this.typing = false;
  //   });

  //   socket.on("joined", (data) => {
  //     this.info.push({
  //       username: data,
  //       type: "joined",
  //     });

  //     setTimeout(() => {
  //       this.info = [];
  //     }, 5000);
  //   });

  //   socket.on("leave", (data) => {
  //     this.info.push({
  //       username: data,
  //       type: "left",
  //     });

  //     setTimeout(() => {
  //       this.info = [];
  //     }, 5000);
  //   });

  //   socket.on("connections", (data) => {
  //     this.connections = data;
  //   });
  // },

  // mounted() {
  //   this.addUser();
  // },

  updated() {
    var messageCard = document.querySelector(".message_card");
    messageCard.scrollTop = document.body.offsetHeight * window.innerHeight;
    window.scrollTo(0, messageCard);
  },
};
</script>
