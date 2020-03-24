/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback } from 'react';
import toaster from 'toasted-notes';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '../Alert';
import Box from '../Box';
import CloseButton from '../CloseButton';
import ThemeProvider, { useTheme } from '../ThemeProvider';

const Toast = ({ status, variant, id, title, isClosable, onClose, description, ...props }) => {
    return (
        <Alert
            status={status}
            variant={variant}
            id={id}
            textAlign="left"
            boxShadow="lg"
            rounded="md"
            alignItems="start"
            m={2}
            pr={8}
            {...props}
        >
            <AlertIcon />
            <Box flex="1">
                {title && <AlertTitle>{title}</AlertTitle>}
                {description && <AlertDescription>{description}</AlertDescription>}
            </Box>
            {isClosable && <CloseButton size="sm" onClick={onClose} position="absolute" right="4px" top="4px" />}
        </Alert>
    );
};

function useToast() {
    const theme = useTheme();

    const notify = useCallback(
        ({
            position = 'bottom',
            duration = 5000,
            render,
            title,
            description,
            status,
            variant = 'solid',
            isClosable,
        }) => {
            const options = {
                position,
                duration,
            };

            if (render) {
                return toaster.notify(
                    ({ onClose, id }) => <ThemeProvider theme={theme}>{render({ onClose, id })}</ThemeProvider>,
                    options
                );
            }

            toaster.notify(
                ({ onClose, id }) => (
                    <ThemeProvider theme={theme}>
                        <Toast
                            {...{
                                onClose,
                                id,
                                title,
                                description,
                                status,
                                variant,
                                isClosable,
                            }}
                        />
                    </ThemeProvider>
                ),
                options
            );
        },
        [theme]
    );

    return notify;
}

export default useToast;
