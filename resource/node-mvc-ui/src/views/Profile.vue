<template>
  <div class="flex w-full h-full justify-center items-center flex-col">
    <div
      class="shadow-xl rounded bg-white text-center text-2xl lg:w-1/2 w-10/12 mt-12 p-4 py-8 border border-gray-100"
    >
      Welcome back to your profile page.
      <br />
      <br />
      {{ full_name }}
      <br />
      {{ email }}
      <br />
      <br />
      <div class="w-full flex flex-1 justify-center items-center">
        <button
          class="text-red-600 border border-red-600 py-2 px-12 rounded transition cursor-pointer flex text-xl"
          @click="deleteAccount"
        >
          <svg
            v-if="isLoading"
            class="animate-spin -ml-1 mr-2 mt-1 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="red"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="red"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Delete your account
        </button>
      </div>
    </div>

    <div
      class="shadow-xl rounded bg-white text-center lg:w-1/2 w-10/12 mt-12 border border-gray-100"
    >
      <form @submit="updateUser">
        <div class="py-8 px-10">
          <div class="flex md:flex-row flex-col">
            <h3 class="text-2xl">Manage your information</h3>
          </div>
          <div class="flex md:flex-row flex-col mt-8">
            <label
              for="full_name"
              class="mr-12 flex-1 text-left md:mt-2 mt-0 font-bold text-md"
              style="min-width: 125px"
              >Full Name</label
            >
            <input
              id="full_name"
              name="full_name"
              type="text"
              class="flex-grow mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-4 py-2 text-md"
              v-model="full_name"
            />
          </div>
          <div class="flex md:flex-row flex-col mt-2">
            <label
              for="email"
              class="mr-12 flex-1 text-left md:mt-2 mt-0 font-bold text-md"
              style="min-width: 125px"
              >Email address</label
            >
            <input
              id="email"
              name="email"
              type="text"
              class="flex-grow mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-4 py-2 text-md"
              v-model="email"
            />
          </div>
        </div>
        <div
          class="flex justify-end items-center px-4 py-3 bg-gray-50 text-right sm:px-6"
        >
          <button
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-normal font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              v-if="isLoadingUpdate"
              class="animate-spin -ml-1 mr-2 mt-0 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueNotifications from "vue-notifications";

export default {
  name: "panel",
  data() {
    return {
      isLoading: false,
      isLoadingUpdate: false,
    };
  },
  computed: {
    _id() {
      return this.$jwt.decode(this.$session.get("jwt"))._id;
    },
    full_name() {
      return this.$jwt.decode(this.$session.get("jwt")).full_name;
    },
    email() {
      return this.$jwt.decode(this.$session.get("jwt")).email;
    },
    token() {
      return this.$session.get("jwt");
    },
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push("/login");
    }
  },
  methods: {
    updateUser: async function (e) {
      e.preventDefault();
      this.isLoadingUpdate = true;

      try {
        const response = await axios({
          url: `${this.$apiHost}/api/user/${this._id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          data: {
            full_name: this.full_name,
            email: this.email,
          },
        });

        if (response.status === 200) {
          this.isLoadingUpdate = false;
          this.showUpdateSuccessMsg();
        }
      } catch (err) {
        this.isLoadingUpdate = false;
      }
    },
    deleteAccount: async function (e) {
      e.preventDefault();
      this.isLoading = true;
      if (confirm("Are you sure?")) {
        try {
          const response = await axios({
            url: `${this.$apiHost}/api/user/${this._id}`,
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
            data: {},
          });

          console.log(response.data);
          if (response.status === 200) {
            this.$session.destroy();
            window.location.href = "/";
          }
        } catch (err) {
          this.isLoading = false;
        }
      } else {
        this.isLoading = false;
      }
    },
  },
  notifications: {
    showUpdateSuccessMsg: {
      type: VueNotifications.types.success,
      title: "Success!",
      message: "Data successfully updated.",
    },
  },
};
</script>
