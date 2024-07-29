import React, { useContext } from 'react';
import { RadioContext } from '@components/common/radio/RadioStoreContext';

interface RadioProps {
    children: React.ReactNode;
    value: string;
    className?: string;
}

const Radio = ({ children, value, className }: RadioProps) => {
    const context = useContext(RadioContext);

    if (!context) {
        throw new Error('Radio must be used within a RadioStoreProvider');
    }

    const { value: selectedValue, onChange } = context;

    const handleChange = () => {
        onChange(value);
    };

    return (
        <label className={className}>
            <input type="radio" value={value} checked={value === selectedValue} onChange={handleChange} />
            {children}
        </label>
    );
};

export default Radio;
