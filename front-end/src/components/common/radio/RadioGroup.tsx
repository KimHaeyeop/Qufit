import { ReactNode } from 'react';
import { RadioProvider } from '@components/common/radio/RadioStoreContext';

interface RadioGroupProps {
    label?: string;
    children: ReactNode;
    className?: string;
    value: string;
    onChange: (value: string) => void;
}

const RadioGroup = ({ label, children, className, value, onChange }: RadioGroupProps) => {
    return (
        <fieldset className={className}>
            {label && <legend>{label}</legend>}
            <RadioProvider value={{ value, onChange }}>{children}</RadioProvider>
        </fieldset>
    );
};

export default RadioGroup;
