<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-white" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                class="h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'text-indigo-600'
                      : 'text-gray-800 hover:text-indigo-600',
                    'px-3 py-2 rounded-md text-sm font-medium'
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                  >{{ item.name }}</a
                >
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <SwitchGroup>
                <div class="flex items-center">
                  <Switch
                    v-model="enabled"
                    :class="enabled ? 'bg-gray-600' : 'bg-gray-200'"
                    class="
                      relative
                      inline-flex
                      h-6
                      w-11
                      items-center
                      rounded-full
                      transition-colors
                      focus:outline-none
                    "
                  >
                    <SunIcon
                      v-if="!enabled"
                      :class="enabled ? 'translate-x-6' : 'translate-x-1'"
                      class="
                        nline-block
                        h-4
                        w-4
                        transform
                        rounded-full
                        bg-white
                        transition-transform
                      "
                    />
                    <MoonIcon
                      v-else
                      :class="enabled ? 'translate-x-6' : 'translate-x-1'"
                      class="
                        flex
                        justify-center
                        rounded-full
                        bg-gray-800
                        text-white
                        transition-transform
                        h-4
                        w-4
                      "
                    />
                    <!-- <span
          :class='enabled ? "translate-x-6" : "translate-x-1"'
          class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
        /> -->
                  </Switch>
                </div>
              </SwitchGroup>

              <!-- Profile dropdown -->
              <Menu as="div" class="ml-3 relative">
                <div>
                  <MenuButton
                    class="
                      max-w-xs
                      rounded-full
                      flex
                      items-center
                      text-sm
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-white
                    "
                  >
                    <span class="sr-only">Open user menu</span>
                    <TranslateIcon class="h-6 w-6" />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="
                      origin-top-right
                      absolute
                      right-0
                      mt-2
                      w-48
                      rounded-md
                      shadow-lg
                      py-1
                      bg-white
                      ring-1 ring-black ring-opacity-5
                      focus:outline-none
                    "
                  >
                    <MenuItem
                      v-for="item in userNavigation"
                      :key="item.name"
                      v-slot="{ active }"
                    >
                      <a
                        :href="item.href"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        ]"
                        >{{ item.name }}</a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="
                bg-gray-800
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-gray-400
                hover:text-white hover:bg-gray-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-offset-gray-800
                focus:ring-white
              "
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              item.current
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium'
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium leading-none text-gray-400">
                {{ user.email }}
              </div>
            </div>
            <button
              type="button"
              class="
                ml-auto
                bg-gray-800
                flex-shrink-0
                p-1
                rounded-full
                text-gray-400
                hover:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-offset-gray-800
                focus:ring-white
              "
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 px-2 space-y-1">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              :href="item.href"
              class="
                block
                px-3
                py-2
                rounded-md
                text-base
                font-medium
                text-gray-400
                hover:text-white hover:bg-gray-700
              "
              >{{ item.name }}</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <div class="py-12 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="lg:text-center">
                <h1
                  class="
                    mt-2
                    text-6xl
                    leading-2
                    font-extrabold
                    tracking-tight
                    uppercase
                    bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500
                  "
                >
                  Snail Pro Vue
                </h1>
                <p
                  class="
                    mt-2
                    text-3xl
                    leading-8
                    font-extrabold
                    tracking-tight
                    text-gray-900
                    sm:text-4xl
                  "
                >
                  开箱即用中后台管理系统
                </p>
                <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  基于Vue3 + Vite2 + Element-plus + Pinia +
                  Vue-Router4等最新技术构建
                </p>
              </div>
              <div class="mt-5 sm:mt-8 sm:flex justify-center">
                <div class="rounded-md shadow">
                  <a
                    href="#"
                    class="
                      w-full
                      flex
                      items-center
                      justify-center
                      px-8
                      py-3
                      border border-transparent
                      text-base
                      font-medium
                      rounded-md
                      text-white
                      bg-gradient-to-r from-indigo-500 to-pink-500
                      hover:bg-indigo-700
                      md:py-4 md:text-lg md:px-10
                    "
                  >
                    立即开始
                  </a>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    class="
                      w-full
                      flex
                      items-center
                      justify-center
                      px-8
                      py-3
                      border border-transparent
                      text-base
                      font-medium
                      rounded-md
                      text-indigo-700
                      bg-indigo-100
                      hover:bg-indigo-200
                      md:py-4 md:text-lg md:px-10
                    "
                  >
                    在线预览
                  </a>
                </div>
              </div>

              <div class="mt-10">
                <dl
                  class="
                    space-y-10
                    md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10
                  "
                >
                  <div
                    v-for="feature in features"
                    :key="feature.name"
                    class="relative"
                  >
                    <dt>
                      <div
                        class="
                          absolute
                          flex
                          items-center
                          justify-center
                          h-12
                          w-12
                          rounded-md
                          bg-indigo-500
                          text-white
                        "
                      >
                        <component
                          :is="feature.icon"
                          class="h-6 w-6"
                          aria-hidden="true"
                        />
                      </div>
                      <p
                        class="
                          ml-16
                          text-lg
                          leading-6
                          font-medium
                          text-gray-900
                        "
                      >
                        {{ feature.name }}
                      </p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-gray-500">
                      {{ feature.description }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Switch,
  SwitchGroup,
  SwitchLabel
} from "@headlessui/vue";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
  TranslateIcon,
  SunIcon,
  MoonIcon
} from "@heroicons/vue/outline";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};
const enabled = ref(false);
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false }
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" }
];
const features = [
  {
    name: "Competitive exchange rates",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: GlobeAltIcon
  },
  {
    name: "No hidden fees",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ScaleIcon
  },
  {
    name: "Transfers are instant",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: LightningBoltIcon
  },
  {
    name: "Mobile notifications",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: AnnotationIcon
  }
];
</script>
