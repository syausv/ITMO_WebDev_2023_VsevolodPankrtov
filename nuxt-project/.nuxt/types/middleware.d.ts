import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "C:/Users/syaus/WebstormProjects/ITMO_WebDev_2023_VsevolodPankrtov/nuxt-project/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}