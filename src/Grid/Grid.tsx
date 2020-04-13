import React, { forwardRef } from 'react';
import { Box } from '../Box';
import { GridProps } from './types';

export const Grid = forwardRef(
    (
        {
            gap,
            rowGap,
            columnGap,
            autoFlow,
            autoRows,
            autoColumns,
            templateRows,
            templateColumns,
            templateAreas,
            area,
            column,
            row,
            ...props
        }: GridProps,
        ref
    ) => (
        <Box
            ref={ref}
            display="grid"
            gridArea={area}
            gridTemplateAreas={templateAreas}
            gridGap={gap}
            gridRowGap={rowGap}
            gridColumnGap={columnGap}
            gridAutoColumns={autoColumns}
            gridColumn={column}
            gridRow={row}
            gridAutoFlow={autoFlow}
            gridAutoRows={autoRows}
            gridTemplateRows={templateRows}
            gridTemplateColumns={templateColumns}
            {...props}
        />
    )
);
