import { ChangeEvent, InputHTMLAttributes } from 'react';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    value: string;
    label?: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextArea = ({ label, onChange, name, value, ...rest }: TextAreaProps) => {
    return (
        <label>
            <p>{label && label}</p>
            <textarea name={name} value={value} onChange={onChange} {...rest}></textarea>
        </label>
    );
};

export default TextArea;
