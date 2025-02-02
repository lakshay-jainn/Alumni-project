import stringSimilarity from 'string-similarity';
import leoProfanity from 'leo-profanity';

class ProfanityFilter {
    private threshold: number;
    private profaneWords: string[];

    constructor(threshold: number = 0.75) {
        this.threshold = threshold;
        leoProfanity.loadDictionary('en');
        this.profaneWords = [...leoProfanity.list(), ...this.generateAbbreviations(leoProfanity.list())];
    }

    private generateAbbreviations(words: string[]): string[] {
      return words.map(word => word.replace(/[aeiou]/gi, '')); // Remove vowels to create common abbreviations
  }

    private normalizeText(text: string): string {
        // Reduce excessive letter repetitions (e.g., "niiiigaaa" → "niigaa")
        return text.replace(/(\w)\1{2,}/g, '$1$1');
    }

    public check(text: string): boolean {
        const normalizedText = this.normalizeText(text);

        // Direct check using leo-profanity
        if (leoProfanity.check(normalizedText)) {
            return true;
        }

        // Fuzzy matching using string-similarity
        const matches = stringSimilarity.findBestMatch(normalizedText, this.profaneWords);
        return matches.bestMatch.rating >= this.threshold;
    }

    public clean(text: string): string {
        return leoProfanity.clean(text);
    }
}

export default ProfanityFilter;
