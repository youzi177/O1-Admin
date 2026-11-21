import type { Directive, DirectiveBinding } from 'vue'
import { useUserStore } from '@/stores'

function updatePermission(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
  const userStore = useUserStore()
  const required = Array.isArray(binding.value) ? binding.value : [binding.value]
  el.style.display = required.every(permission => userStore.hasPermission(permission)) ? '' : 'none'
}

export const permissionDirective: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) { updatePermission(el, binding) },
  updated(el, binding) { updatePermission(el, binding) },
}
