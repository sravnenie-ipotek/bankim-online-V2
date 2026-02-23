/**
 * Formats seconds as "m:ss" for video time display.
 */
export class FormatTimeHelper {
  /**
   * @param seconds - Time in seconds (e.g. from video currentTime/duration).
   * @returns Formatted string "m:ss".
   */
  static formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
