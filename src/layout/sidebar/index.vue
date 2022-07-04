<template>
  <div class="hidden w-64 shrink-0 lg:block lg:pr-8 border-r dark:border-slate-50/[0.06] mr-8">
    <div class="sticky top-[112px]">
      <div class="mb-6">
        <div class="relative">
          <div class="relative">
            <div class="flex">
              <div class="w-64 max-h-screen overflow-x-hidden overflow-y-auto">
                <nav>
                  <div>
                    <p
                      class="
                        text-gray-300
                        ml-2
                        w-full
                        border-b-2
                        pb-2
                        border-gray-100
                        mb-2
                        text-md
                        font-normal
                      "
                    >
                      指南
                    </p>
                    <a
                      class="
                        font-thin
                        text-gray-500
                        dark:text-gray-400
                        flex
                        items-center
                        p-2
                        transition-colors
                        duration-200
                        justify-start
                      "
                      href="#"
                    >
                      <span class="text-md font-normal">
                       javascript
                      </span>
                    </a>
                    <a
                      class="
                        font-thin
                        text-gray-500
                        dark:text-gray-400
                        flex
                        items-center
                        p-2
                        transition-colors
                        duration-200
                        justify-start
                      "
                      href="#"
                    >
                      <span class="text-md font-normal">
                        Node开发
                      </span>
                    </a>
                  </div>
               
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { docMenus } from "@/routes/doc-routes.js";
</script>

