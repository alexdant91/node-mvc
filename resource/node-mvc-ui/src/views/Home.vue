<template>
  <div class="home flex justify-center items-center flex-col">
    <HelloWorld />
  </div>
</template>

<script>
// import { io } from "socket.io-client";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  computed: {
    // Connect on /notifications namespace
    // socket() {
    //   return io("http://localhost:9000/notifications", {
    //     withCredentials: true,
    //     extraHeaders: {
    //       Auth: "my-header",
    //     },
    //   });
    // },
  },
  created() {
    // this.socket.on("connect", () => console.log(`On /notifications connected`));
    // this.socket.on("new", (val) => console.log(val));
    // this.socket.emit(
    //   "subscribe",
    //   this.$jwt.decode(this.$session.get("jwt"))._id
    // );
  },
  // Global socket connection
  // sockets: {
  //   connect() {
  //     console.log("socket connected");
  //   },
  //   hello(val) {
  //     console.log(val);
  //     this.$socket.client.emit("hello", { message: "I can here you!" });
  //   },
  // },
};
</script>
