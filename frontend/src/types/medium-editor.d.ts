type EditorElement = string|HTMLElement|HTMLCollection|NodeList;
type EditorElements = EditorElement|EditorElement[];

declare class MediumEditor {
  constructor(elements: EditorElements, options: any);

  destroy(): void;
  setup(): void;
  addElements(elements: EditorElements): void;
}
