export default class ArticleUtils {
  static calculateReadingTime(content: string): number {
    let words = content.split(' ')
    return Math.round(words.length / 300)
  }
}
