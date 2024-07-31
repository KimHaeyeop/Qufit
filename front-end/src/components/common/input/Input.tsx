import { ChangeEvent, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    value: string;
    label?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, name, value, onChange, ...rest }: InputProps) => {
    return (
        <label>
            <p>{label && label}</p>
            <input name={name} value={value} onChange={onChange} {...rest} />
        </label>
    );
};

export default Input;
