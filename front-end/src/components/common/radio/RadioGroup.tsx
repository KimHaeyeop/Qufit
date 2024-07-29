import { ReactNode } from 'react';

interface RadioGroupProps {
    label?: string;
    children: ReactNode;
    className?: string;
}

const RadioGroup = ({ label, children, className }: RadioGroupProps) => {
    return (
        <fieldset className={className}>
            {label && <legend>{label}</legend>}
            {children}
        </fieldset>
    );
};

export default RadioGroup;
