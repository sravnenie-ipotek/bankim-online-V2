declare module 'tailwindcss-rtl' {
  type TailwindPlugin = (api: unknown) => void
  const plugin: TailwindPlugin
  export default plugin
}
