import React from 'react';
import { Icon } from '../Icon';
import { PseudoBox } from '../PseudoBox';
import useCloseButtonStyle from './styles';
import { CloseButtonProps } from './types';

export const CloseButton = ({
    size = 'sm',
    type = 'button',
    isDisabled,
    color = 'faintText',
    'aria-label': ariaLabel = 'Close',
    ...rest
}: CloseButtonProps) => {
    const closeButtonStyleProps = useCloseButtonStyle({
        size,
    });

    const iconSizes = {
        lg: '16px',
        md: '12px',
        sm: '10px',
    };
    const iconSize = iconSizes[size];

    return (
        <PseudoBox
            as="button"
            aria-disabled={isDisabled}
            disabled={isDisabled}
            aria-label={ariaLabel}
            type={type}
            {...closeButtonStyleProps}
            {...rest}
        >
            <Icon color={color} focusable={false} name="close" aria-hidden size={iconSize} />
        </PseudoBox>
    );
};
