export class ExpandableIconListKeyboardHelper {
  public static shouldToggle(key: string): boolean {
    return key === 'Enter' || key === ' ';
  }
}
