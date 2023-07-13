import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "defaul" | "mobile"
declare module "C:/Users/syaus/WebstormProjects/ITMO_WebDev_2023_VsevolodPankrtov/nuxt-project/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}