import RadioGroup from '@components/common/radio/RadioGroup';
import { ChangeEvent, ReactNode } from 'react';

interface BalanceGameGroupProps {
    label?: string;
    children: ReactNode;
    className?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

const GameChoiceGroup = ({ label, children, value, onChange, ...rest }: BalanceGameGroupProps) => {
    return (
        <div className="flex flex-col gap-4">
            <p className="text-3xl">{label}</p>
            <RadioGroup value={value} onChange={onChange} className="flex flex-wrap " {...rest}>
                {children}
            </RadioGroup>
        </div>
    );
};

export default GameChoiceGroup;
