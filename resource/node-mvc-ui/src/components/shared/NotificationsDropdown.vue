<template>
  <div class="relative my-32">
    <button
      @click="toggleDropdown"
      class="relative z-10 block rounded-md bg-gray-800 p-2 focus:outline-none"
    >
      <div class="new-notification-dot" v-if="newNotifications"></div>
      <svg
        class="h-5 w-5 text-gray-800"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="#ffffff"
      >
        <path
          d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
        />
      </svg>
    </button>

    <div
      v-if="dropdownOpen"
      @click="() => toggleDropdown(false)"
      class="fixed inset-0 h-full w-full z-10"
    ></div>

    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
      style="width: 20rem"
    >
      <div class="pt-2 notifications-dropdown-wrapper">
        <div v-if="notifications.length">
          <a
            @click="() => toggleNotificationRead(notification.id)"
            v-for="notification in notifications"
            v-bind:key="notification.id"
            :class="[
              'flex items-start justify-start px-4 py-3 border-b hover:bg-gray-100 -mx-2 relative cursor-pointer',
              notification.read ? 'bg-white' : 'bg-gray-200',
            ]"
          >
            <img
              class="h-8 w-8 rounded-full object-cover mx-1"
              :src="notification.avatar"
              alt="avatar"
            />
            <div
              class="text-gray-600 text-sm mx-2 flex flex-col justify-start items-start text-left"
            >
              <div class="notification-text-wrapper">
                <span class="font-bold" href="#">{{ notification.name }}</span>
                {{ notification.action }}
                <span class="font-bold text-blue-500" href="#">{{
                  notification.target
                }}</span>
                <span class="text-gray-400"> – {{ notification.time }} </span>
              </div>
            </div>
            <div
              v-if="!notification.read"
              class="unread-notification-dot"
            ></div>
          </a>
        </div>
        <div
          v-else
          class="p-4 text-center flex flex-col justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="envelope-open-text"
            class="svg-inline--fa fa-envelope-open-text fa-w-16"
            role="img"
            viewBox="0 0 512 512"
            width="35"
            fill="#9ea5b1"
          >
            <path
              d="M176 216h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16zm-16 80c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16zm96 121.13c-16.42 0-32.84-5.06-46.86-15.19L0 250.86V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V250.86L302.86 401.94c-14.02 10.12-30.44 15.19-46.86 15.19zm237.61-254.18c-8.85-6.94-17.24-13.47-29.61-22.81V96c0-26.51-21.49-48-48-48h-77.55c-3.04-2.2-5.87-4.26-9.04-6.56C312.6 29.17 279.2-.35 256 0c-23.2-.35-56.59 29.17-73.41 41.44-3.17 2.3-6 4.36-9.04 6.56H96c-26.51 0-48 21.49-48 48v44.14c-12.37 9.33-20.76 15.87-29.61 22.81A47.995 47.995 0 0 0 0 200.72v10.65l96 69.35V96h320v184.72l96-69.35v-10.65c0-14.74-6.78-28.67-18.39-37.77z"
            />
          </svg>
          <div class="mt-2 text-gray-400">Theres no notifications.</div>
        </div>
      </div>
      <a
        href="#"
        class="block bg-gray-800 text-white text-center font-bold py-2 text-sm"
        >See all notifications</a
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { io } from "socket.io-client";

export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dropdownOpen: this.dropdownOpen,
      newNotifications: false,
      notifications: [
        // {
        //   id: 0,
        //   read: true,
        //   name: "Sara Salah",
        //   action: "replied on the",
        //   target: "Upload Image",
        //   time: "2m",
        //   avatar:
        //     "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
        // },
      ],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    notificationSocket() {
      return io("http://localhost:9000/notifications", {
        withCredentials: true,
        extraHeaders: {
          Auth: this.$session.get("jwt") || null,
        },
      });
    },
    notificationSound() {
      return new Audio(require("../../assets/sounds/notification-sound.mp3"));
    },
  },
  created() {
    this.notificationSocket.emit(
      "subscribe",
      this.$jwt.decode(this.$session.get("jwt"))._id
    );

    this.notificationSocket.on("connect", () => {
      this.notificationSocket.on("joined", (val) => console.log(val));

      this.notificationSocket.on("notify", (val) => {
        this.notifications.unshift(val);
        this.toggleNewNotifications(true);
        this.playSound();
      });
    });
  },
  methods: {
    toggleDropdown(open = undefined) {
      if (open === undefined) this.dropdownOpen = !this.dropdownOpen;
      else this.dropdownOpen = open;

      if (this.dropdownOpen) this.toggleNewNotifications(false);
    },
    toggleNewNotifications(isNew = undefined) {
      if (isNew === undefined) this.newNotifications = !this.newNotifications;
      else this.newNotifications = isNew;
    },
    toggleNotificationRead(id) {
      const index = this.notifications.findIndex((item) => item.id == id);
      this.notifications[index].read = true;
    },
    playSound() {
      this.notificationSound.src = require("../../assets/sounds/notification-sound.mp3");
      this.notificationSound.currentTime = 0;
      this.notificationSound.play();
    },
    stopSound() {
      this.notificationSound.pause();
      this.notificationSound.currentTime = 0;
    },
  },
};
</script>

<style scoped>
.notifications-dropdown-wrapper {
  max-height: 250px;
  overflow-y: auto;
}

.new-notification-dot {
  position: absolute;
  width: 15px;
  height: 15px;
  background: #db2725;
  right: 2px;
  border-radius: 50%;
  top: 1px;
  border: 3px solid #1f2a37;
}

.unread-notification-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #3c81f6;
  right: 26px;
  border-radius: 50%;
  top: 24px;
}

.notification-text-wrapper {
  max-width: 90%;
}
</style>
