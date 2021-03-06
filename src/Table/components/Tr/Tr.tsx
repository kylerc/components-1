import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import React from 'react';
import { Box } from '../../../Box';
import { Button } from '../../../Button';
import { Collapse } from '../../../Collapse';
import { Flex } from '../../../Flex';
import { useTheme } from '../../../ThemeProvider';
import useTableStyle from '../../styles';
import { TableRowProps } from '../../types';
import { Td } from '../Td';

export const Tr = (props: TableRowProps) => {
    const { colors } = useTheme();
    const { expandedContent, asComponent } = props;
    const { row: rowStyleProps } = useTableStyle({
        expandedContent,
    });
    const [expanded, setExpanded] = React.useState(false);

    const handleExpand = () => setExpanded(!expanded);
    const RowComponent = !asComponent ? Box : asComponent;
    const rowProps = asComponent ? {} : { as: 'tr' };

    return (
        <>
            <RowComponent
                style={
                    // needed to apply styles to motion component while keeping correct table structure
                    asComponent && {
                        ...rowStyleProps,
                        ...props,
                        borderColor: colors.border,
                    }
                }
                {...rowProps}
                {...rowStyleProps}
                {...props}
            >
                {props.children}
                {expandedContent && (
                    <Box as="td">
                        <Flex
                            align="center"
                            position="absolute"
                            right={4}
                            h="100%"
                            transform={expanded && 'rotate(180deg)'}
                            transition="0.2s"
                        >
                            <Button
                                onClick={handleExpand}
                                size="sm"
                                variant="unstyled"
                                leftIcon={ChevronDownIcon}
                                color="faintText"
                                iconOnly
                            />
                        </Flex>
                    </Box>
                )}
            </RowComponent>
            <ExpandedRow expanded={expanded} {...props} />
        </>
    );
};

const ExpandedRow = props => {
    const { expandedContent, expanded } = props;
    const { expandedRow: expandedRowStyleProps } = useTableStyle({});
    if (!expandedContent) {
        return null;
    }
    return (
        <Tr {...expandedRowStyleProps} {...props} expandedContent={null} borderBottomWidth={1}>
            <Td py={0}>
                <Collapse my="spacing" isOpen={expanded}>
                    {expandedContent}
                </Collapse>
            </Td>
        </Tr>
    );
};
