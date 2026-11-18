// src/types/menu.ts

export interface MenuItem {
  name: string
  icon?: string
  path?: string
  children?: MenuItem[]
}
