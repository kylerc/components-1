import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { CSSReset, Flex, Navigation, theme, ThemeProvider, useTheme } from '../../../../src';
import { CanvasWrapper } from '../../../../src/Canvas';
import { CanvasMenu } from '../../../../src/CanvasMenu';
import { PageFooter } from '../../../../src/Page';
import { GroupSidebar } from '../GroupSidebar';
import { NavPrimary, NavSecondary, NavTertiary } from '../Header';
import { NotificationsPanel } from '../NotificationsPanel';
import { menuItems } from './menu';

export const AppShellBase = props => {
    const { children } = props;
    const { breakpoint } = useTheme();

    const initialCanvasState = {
        overview: {
            name: 'overview',
            position: 'left',
            ranges: {
                defaultVisible: [breakpoint.stripped.md, 9999],
                isOverlay: [0, breakpoint.stripped.md], // --> type is Overlay and not visible by default
                allowMinify: [breakpoint.stripped.md, 9999], // --> isMinifiable
                defaultMinified: [0, 9999], // --> isMinified
            },
            render: componentProps => <GroupSidebar {...componentProps} />,
            bg: 'primary.500',
            width: 72,
            borderRight: 0,
            p: 4,
        },
        menu: {
            name: 'menu',
            position: 'left',
            ranges: {
                defaultVisible: [breakpoint.stripped.md, 9999],
                isOverlay: [0, breakpoint.stripped.md],
                allowMinify: [breakpoint.stripped.md, 9999],
                defaultMinified: [breakpoint.stripped.md, breakpoint.stripped.lg],
            },
            render: componentProps => <CanvasMenu as="nav" items={menuItems} {...componentProps} />,
            bg: 'canvasBg',
        },
        main: {
            name: 'main', // Main section is always visible, inline, and non-minifiable
            render: componentProps => {
                return (
                    <>
                        {/* Header */}
                        <Navigation>
                            <NavPrimary />
                            <NavSecondary />
                            <NavTertiary />
                        </Navigation>

                        <Flex direction="column" overflowY="auto" h="100%">
                            {/* Main */}
                            {componentProps.children}

                            {/* Footer */}
                            <PageFooter>Footer</PageFooter>
                        </Flex>
                    </>
                );
            },
            bg: 'pageBg',
        },
        notification: {
            name: 'notifications',
            position: 'right',
            ranges: {
                defaultVisible: false,
                isOverlay: [0, 9999],
                allowMinify: false,
                defaultMinified: false,
            },
            render: componentProps => <NotificationsPanel {...componentProps} />,
            bg: 'navBg',
        },
    };

    return (
        <HelmetProvider>
            <CSSReset />

            <Helmet>
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,500;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <CanvasWrapper initialCanvasState={initialCanvasState}>{children}</CanvasWrapper>
        </HelmetProvider>
    );
};

export const AppShell = props => (
    <ThemeProvider theme={{ ...theme, fonts: { ...theme.fonts, heading: 'Poppins' } }}>
        <AppShellBase {...props} />
    </ThemeProvider>
);
