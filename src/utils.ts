import path from "path";

export const getBasePath = () =>
  path.join(path.dirname(require.main?.filename ?? ""), "..", "test");
