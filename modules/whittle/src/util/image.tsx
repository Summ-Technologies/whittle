import config, {IMAGES_BASE_URL_KEY} from '../config'
export const imageNames = {
  treesCloudsSunBackground: 'purple-trees-clouds-sun-background-1.png',
}
export class ImageUtils {
  static getImageUrl(imageName: string): string {
    let baseUrl: string = config.get(IMAGES_BASE_URL_KEY)
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/'
    }
    return `${baseUrl}${imageName}`
  }
}
