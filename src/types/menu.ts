export interface MenuItem {
  name: string
  icon?: string
  path?: string
  permission?: string
  children?: MenuItem[]
}
