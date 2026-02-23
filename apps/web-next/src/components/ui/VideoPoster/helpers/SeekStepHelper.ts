export class SeekStepHelper {
  private static readonly SEEK_STEP_PERCENT = 0.1;
  private static readonly SEEK_STEP_MIN_SEC = 5;
  private static readonly SEEK_STEP_MAX_SEC = 30;

  static getSeekStepSeconds(duration: number): number {
    if (duration <= 0) return SeekStepHelper.SEEK_STEP_MIN_SEC;
    const step = duration * SeekStepHelper.SEEK_STEP_PERCENT;
    return Math.round(
      Math.max(SeekStepHelper.SEEK_STEP_MIN_SEC, Math.min(SeekStepHelper.SEEK_STEP_MAX_SEC, step))
    );
  }
}
