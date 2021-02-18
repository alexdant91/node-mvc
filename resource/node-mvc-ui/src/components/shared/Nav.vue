<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded="false"
            @click="toggleMainMenu"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed. -->
            <!--
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          -->
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Icon when menu is open. -->
            <!--
            Heroicon name: x

            Menu open: "block", Menu closed: "hidden"
          -->
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <router-link
                to="/"
                exact
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex"
                active-class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </router-link>
            </div>
          </div>
        </div>

        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="hidden sm:block sm:ml-6 right">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <span v-if="!user.isLoggedIn" class="flex">
                <router-link
                  to="/login"
                  exact
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex"
                  active-class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </router-link>
                <router-link
                  to="/register"
                  exact
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex"
                  active-class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </router-link>
              </span>
              <span v-else class="flex">
                <router-link
                  to="/profile"
                  active-class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex"
                >
                  Profile
                </router-link>
                <a
                  href
                  class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex"
                  @click="logout"
                >
                  <svg
                    v-if="isLoading"
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
                  Logout
                </a>
              </span>
            </div>
          </div>
          <!-- Profile dropdown -->
          <div class="ml-3 relative" v-if="user.isLoggedIn">
            <div v-click-outside="closeMenu">
              <button
                class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu"
                aria-haspopup="true"
                @click="toggleMenu"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Wayfarers&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BlondeGolden&clotheType=ShirtVNeck&clotheColor=Gray01&eyeType=WinkWacky&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Light"
                  alt="Profile Image"
                />
              </button>
              <div
                :class="[
                  'origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 transition',
                  isOpening
                    ? 'transform opacity-100 scale-100 pointer-events-auto'
                    : 'transform opacity-0 scale-95 pointer-events-none',
                ]"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex"
                  role="menuitem"
                >
                  Your Profile
                </router-link>
                <a
                  href
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex"
                  role="menuitem"
                  @click="logout"
                >
                  <svg
                    v-if="isLoading"
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
                      stroke="#1f2937"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="#1f2937"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logout</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
    <div :class="[isOpeningMenu ? 'sm:block block' : 'sm:hidden hidden']">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <router-link
          to="/"
          active-class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex"
          exact
        >
          Home
        </router-link>
        <span v-if="!user.isLoggedIn">
          <router-link
            to="/login"
            active-class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex"
          >
            Login
          </router-link>
          <router-link
            to="/register"
            active-class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex"
          >
            Register
          </router-link>
        </span>
        <span v-else>
          <router-link
            to="/profile"
            active-class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex"
          >
            Profile
          </router-link>
          <a
            href
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex"
            @click="logout"
          >
            <svg
              v-if="isLoading"
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
            Logout
          </a>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { mapState } from "vuex";

export default {
  data() {
    return {
      isOpening: false,
      isOpeningMenu: false,
      isLoading: false,
      userSession: this.$session.exists(),
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  mounted() {
    // console.log(this.user);
  },
  methods: {
    closeMenu() {
      this.isOpening = false;
    },
    toggleMenu() {
      this.isOpening = !this.isOpening;
    },
    toggleMainMenu() {
      this.isOpeningMenu = !this.isOpeningMenu;
    },
    logout: function () {
      this.isLoading = true;
      this.$session.destroy();
      this.$store.dispatch("user/logout");
      // window.location.href = "/";
      this.$router.push("/");
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>
