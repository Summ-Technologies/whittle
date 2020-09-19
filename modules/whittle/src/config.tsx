/* Config keys */
export const SERVER_BASE_URL_KEY = 'server_base_url'
export const IMAGES_BASE_URL_KEY = 'images_base_url'
type ConfigKey = typeof SERVER_BASE_URL_KEY | typeof IMAGES_BASE_URL_KEY

class Config {
  appConfig: {[key: string]: any}
  defaultConfig: {[key: string]: any} = {}
  constructor() {
    this.appConfig = {}
    // Set url values passed in at runtime
    if (process.env.NODE_ENV === 'development') {
      // When in development mode, comes from ENV_VAR
      let apiUrl = process.env.REACT_APP_API_URL
      if (apiUrl) {
        this.appConfig[SERVER_BASE_URL_KEY] = apiUrl
      } else {
        throw Error('Environment variable missing: REACT_APP_API_URL')
      }
      let imagesBaseUrl = process.env.REACT_APP_IMAGES_URL
      if (imagesBaseUrl) {
        this.appConfig[IMAGES_BASE_URL_KEY] = imagesBaseUrl
      } else {
        throw Error('Environment variable missing: REACT_APP_IMAGES_URL')
      }
    } else {
      // When in production, comes from config.js file at runtime
      let windowConfig = ((window as any) as {appConfig: any}).appConfig
      if (windowConfig) {
        this.appConfig = {
          ...windowConfig,
        }
      }
    }
  }
  get(configKey: ConfigKey): any {
    var val = this.appConfig[configKey]
    if (val === undefined) {
      val = this.defaultConfig[configKey]
    }
    return val
  }
  set(configKey: ConfigKey, configVal: any): void {
    /* Updates global app config object */
    this.appConfig[configKey] = configVal
  }
}

var config = new Config()
export default config
