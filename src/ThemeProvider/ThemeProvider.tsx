import { ThemeContext } from '@emotion/core';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import React, { useContext } from 'react';
import { ColorModeProvider, IColorModeProvider, useColorMode } from '../ColorModeProvider';
import { baseTheme, theme, ThemeType } from '../theme';
import { ITheme } from '../theme/types';

export interface IThemeProvider {
    theme?: ITheme;
    children?: React.ReactNode;
    defaultMode?: 'light' | 'dark';
}

// TODO: check into providerTheme type tslint error when ITHemeProvider is used
// @ts-ignore
const BaseThemeProvider = ({ theme: providedTheme, children }: IThemeProvider) => {
    const colorMode = useColorMode();

    // needs more work still to override existing styles, but still allow dependencies.
    // i.e, "button" color prop depends on primary, so passing a different primary color should change all props dependent on primary
    const emotionTheme = baseTheme({
        providedTheme,
        mode: colorMode?.mode,
    });
    return <EmotionThemeProvider theme={emotionTheme as ThemeType}>{children}</EmotionThemeProvider>;
};

export const ThemeProvider = ({ theme: providedTheme, children, defaultMode }: IThemeProvider) => {
    const mode = ((__BROWSER__ && localStorage?.getItem('themeMode')) ||
        defaultMode ||
        'light') as IColorModeProvider['defaultMode'];
    return (
        <ColorModeProvider defaultMode={mode}>
            <BaseThemeProvider theme={providedTheme}>{children}</BaseThemeProvider>
        </ColorModeProvider>
    );
};

export function useTheme(): ITheme {
    const _theme = useContext(ThemeContext);
    if (theme === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    // @ts-ignore
    return _theme;
}
