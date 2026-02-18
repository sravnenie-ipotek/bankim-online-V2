export interface ServerMode {
  mode: 'modern' | 'legacy'
  server: string
  file: string
  warning: boolean
  message: string
  status?: string
  recommendedSwitch?: string
}
