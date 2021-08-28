export interface ITemplateComponent {
  componentName: string;
}
export interface ITemplateContext {
  contextName: string;
}

export enum ETemplate {
  CONTEXT = "context.tsx.hbs",
  COMPONENT = "component.tsx.hbs",
}

export interface ITemplate {
  [ETemplate.CONTEXT]: ITemplateContext;
  [ETemplate.COMPONENT]: ITemplateComponent;
}
