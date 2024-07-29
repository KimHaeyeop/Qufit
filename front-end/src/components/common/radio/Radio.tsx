import { useRadioSetValueStore, useRadioValueStore } from '@stores/common/radioStore';
import { ReactNode } from 'react';

interface RadioProps {
    children: ReactNode;
    value: string;
    className?: string;
}
const Radio = ({ children, value, className }: RadioProps) => {
    const checkedValue = useRadioValueStore();
    const setCheckedValue = useRadioSetValueStore();
    return (
        <label>
            <input
                type="radio"
                value={value}
                checked={value === checkedValue}
                // onChange={(e) => group.onChange && group.onChange(e.target.value)}
                onChange={(e) => setCheckedValue(e.target.value)}
                className={className}
            />
            {children}
        </label>
    );
};

export default Radio;
