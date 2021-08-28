export interface ITemplateComponent {
  componentName: string;
}
export interface ITemplateComponentTypes {
  componentName: string;
}

export interface ITemplateComponentStyles {}
export interface ITemplateContext {
  contextName: string;
}

export enum ETemplate {
  CONTEXT = "context.tsx.hbs",
  //#region component templates
  COMPONENT = "component/index.tsx.hbs",
  COMPONENT_TYPES = "component/types.ts.hbs",
  COMPONENT_STYLES = "component/index.styled.ts.hbs",
  //#endregion
}

export interface ITemplate {
  [ETemplate.CONTEXT]: ITemplateContext;
  [ETemplate.COMPONENT]: ITemplateComponent;
  [ETemplate.COMPONENT_TYPES]: ITemplateComponentTypes;
  [ETemplate.COMPONENT_STYLES]: ITemplateComponentStyles;
}
