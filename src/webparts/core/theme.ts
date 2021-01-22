import { FluentCustomizations } from "@uifabric/fluent-theme";
import { createTheme, ICustomizerProps } from "@fluentui/react";

export const theme = createTheme({
  palette: (window as any).__themeState__.theme,
});

export const customizations: ICustomizerProps = {
  ...FluentCustomizations,
  settings: {
    ...FluentCustomizations.settings,
    theme,
  },
};