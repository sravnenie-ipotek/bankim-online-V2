/** Badge item for the picture host (icon + text only; positions are fixed in the host). */
export interface ExpandableIconListSideContentBadge {
  iconSrc?: string;
  text: string;
}

export interface ExpandableIconListSideContent {
  imageFrontSrc: string;
  imageBackSrc?: string;
  /** Icon badges to display in the picture host when this section is selected. */
  badges?: ExpandableIconListSideContentBadge[];
  banners?: string[];
}
