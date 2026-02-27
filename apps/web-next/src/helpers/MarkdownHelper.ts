/**
 * Converts simple markdown (bold and newlines) to safe HTML for display in legal/text pages.
 * Content is expected from the content API (trusted source); output is sanitized for display.
 */
export class MarkdownHelper {
  /**
   * Escapes HTML special characters to prevent injection.
   */
  private static escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return text.replace(/[&<>"']/g, (ch) => map[ch] ?? ch);
  }

  /**
   * Converts **bold** to <strong> and newlines to <br />.
   * Normalizes literal "\\n" (backslash-n) and \" (backslash-quote) from API/DB so they render correctly.
   * Use for trusted CMS/API content (e.g. refund_text, terms_text).
   */
  static simpleToHtml(text: string): string {
    if (!text || typeof text !== 'string') return '';
    const withRealNewlines = text.replace(/\\n/g, '\n');
    const withUnescapedQuotes = withRealNewlines.replace(/\\"/g, '"');
    const escaped = this.escapeHtml(withUnescapedQuotes);
    const withStrong = this.applyBold(escaped);
    return withStrong.replace(/\n/g, '<br />');
  }

  private static applyBold(text: string): string {
    const parts = text.split(/\*\*([\s\S]+?)\*\*/g);
    if (parts.length <= 1) return text;
    let result = '';
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 1) {
        result += `<strong>${parts[i]}</strong>`;
      } else {
        result += parts[i];
      }
    }
    return result;
  }
}
