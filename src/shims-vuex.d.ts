import { Store } from "@/store"; // path to store file
import { ComponentCustomProperties } from 'vue'

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store;
  }
}