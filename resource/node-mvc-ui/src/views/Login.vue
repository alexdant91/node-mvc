<template>
  <div class="login">
    <div
      class="min-h-screen flex items-start justify-center bg-gray-50 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div
        class="max-w-md w-full space-y-8 bg-white border border-gray-100 shadow-xl p-8 rounded"
      >
        <div>
          <h2 class="mt-0 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST" @submit="login">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                v-model="form.email"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                v-model="form.password"
              />
            </div>
          </div>

          <div v-if="isError">
            <p class="text-center text-red-600">
              User not found, maybe
              <router-link
                to="/register"
                class="font-medium text-indigo-600 hover:text-indigo-500 underline"
              >
                register
              </router-link>
              it.
            </p>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <router-link
                to="/register"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Don't have an account?
              </router-link>
            </div>

            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Heroicon name: lock-closed -->
                <svg
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>

              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-1 h-5 w-5 text-white"
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
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      isError: false,
      isLoading: false,
    };
  },
  methods: {
    login: async function (e) {
      e.preventDefault();
      this.isError = false;
      this.isLoading = true;
      try {
        const response = await axios({
          url: `${this.$apiHost}/api/auth/token`,
          method: "POST",
          data: {
            ...this.form,
          },
        });

        if (response.status === 200 && "token" in response.data) {
          this.$session.start();
          this.$session.set("jwt", response.data.token);
          this.$store.dispatch("user/login", response.data.token);
          // window.location.href = "/profile";
          this.$router.push("/profile");
        } else {
          this.isError = true;
        }
      } catch (err) {
        this.isError = true;
        this.isLoading = false;
      }
    },
  },
};
</script>
