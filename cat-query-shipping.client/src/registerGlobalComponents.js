export function registerGlobalComponents(root) {
  // https://webpack.js.org/guides/dependency-management/#require-context
  // @ts-ignore
  const components = import.meta.globEager('./components/*.vue')
  Object.entries(components).forEach(([fileName, component]) => {
    const componentName = component.name || fileName
      .substr(fileName.lastIndexOf('/') + 1)
      .replace(/\.\w+$/, '')
    // Register component on this Vue instance
    root.component(componentName, component.default)
  })
  const glitches = import.meta.globEager('./components/glitches/*.vue')
  Object.entries(glitches).forEach(([fileName, component]) => {
    const componentName = component.name || fileName
      .substr(fileName.lastIndexOf('/') + 1)
      .replace(/\.\w+$/, '')
    // Register component on this Vue instance
    root.component(componentName, component.default)
  })

  const mods = import.meta.globEager('./components/mods/*.vue')
  Object.entries(mods).forEach(([fileName, component]) => {
    const componentName = component.name || fileName
      .substr(fileName.lastIndexOf('/') + 1)
      .replace(/\.\w+$/, '')
    // Register component on this Vue instance
    root.component(componentName, component.default)
  })

  const warehouse = import.meta.globEager('./components/warehouse/*.vue')
  Object.entries(warehouse).forEach(([fileName, component]) => {
    const componentName = component.name || fileName
      .substr(fileName.lastIndexOf('/') + 1)
      .replace(/\.\w+$/, '')
    // Register component on this Vue instance
    root.component(componentName, component.default)
  })
}
