/* Config keys */
// Make sure any keys changed here are adjusted in the setup_config.sh script
export const SERVER_BASE_URL_KEY = 'server_base_url'
export const IMAGES_BASE_URL_KEY = 'images_base_url'
export const NUM_ARTICLES_PER_PAGE_KEY = 'num_articles_per_page'
export const MIXPANEL_PROJECT_TOKEN_KEY = 'mixpanel_project_token'
type ConfigKey =
  | typeof SERVER_BASE_URL_KEY
  | typeof IMAGES_BASE_URL_KEY
  | typeof NUM_ARTICLES_PER_PAGE_KEY
  | typeof MIXPANEL_PROJECT_TOKEN_KEY

class Config {
  appConfig: {[key: string]: any}
  defaultConfig: {[key: string]: any} = {
    [NUM_ARTICLES_PER_PAGE_KEY]: 20,
  }
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
      this.appConfig[MIXPANEL_PROJECT_TOKEN_KEY] =
        process.env.REACT_APP_MIXPANEL_PROJECT_TOKEN
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
