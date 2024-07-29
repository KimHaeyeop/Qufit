import { CheckboxContext } from '@components/common/checkbox/CheckboxContext';
import { ReactNode, useContext } from 'react';

interface CheckboxProps {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    value: string;
    checked?: boolean;
    onChange?: (value: string) => void;
}
const Checkbox = ({ children, className, disabled, value, checked, onChange }: CheckboxProps) => {
    const context = useContext(CheckboxContext);

    if (!context) {
        return (
            <label>
                <input
                    type="checkbox"
                    className={className}
                    disabled={disabled}
                    checked={checked}
                    onChange={(event) => onChange?.(event.target.value)}
                />
            </label>
        );
    }
    const { isChecked, toggleValue } = context;
    return (
        <label>
            <input
                type="checkbox"
                disabled={disabled}
                checked={isChecked(value)}
                onChange={(event) => toggleValue({ checked: event.target.checked, value })}
                className={className}
            />
            {children}
        </label>
    );
};

export default Checkbox;
