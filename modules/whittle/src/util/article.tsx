export default class ArticleUtils {
  static calculateReadingTime(content: string): number {
    let strippedContent = content.replace(/<[^>]*>?/gm, '')
    let words = strippedContent.split(' ')
    return Math.round(words.length / 300)
  }
}
