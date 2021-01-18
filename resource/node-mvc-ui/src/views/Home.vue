<template>
  <div class="home flex justify-center items-center flex-col">
    <HelloWorld />
  </div>
</template>

<script>
import { io } from "socket.io-client";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  computed: {
    // Connect on /home namespace
    socket() {
      return io("http://localhost:8008/home", {
        withCredentials: true,
        extraHeaders: {
          Auth: "my-header",
        },
      });
    },
  },
  created() {
    this.socket.on("connect", () => console.log(`On /home connected`));
    this.socket.on("helloHome", (val) => console.log(val));
  },
  // Global socket connection
  sockets: {
    connect() {
      console.log("socket connected");
    },
    hello(val) {
      console.log(val);
      this.$socket.client.emit("hello", { message: "I can here you!" });
    },
  },
};
</script>
