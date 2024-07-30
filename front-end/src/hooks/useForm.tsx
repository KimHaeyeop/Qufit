import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export type Valids = { [key: string]: boolean };
export type Messages = { [key: string]: string };
interface FormProps<Type> {
    initialValues: Type;
    onSubmit: (values: Type) => void;
    validate: (values: Type) => { valids: Valids; messages: Messages };
}

const useForm = <T,>({ initialValues, onSubmit, validate }: FormProps<T>) => {
    const [values, setValues] = useState(initialValues);
    const [messages, setMessages] = useState<Messages>();
    const [valids, setValids] = useState<Valids>();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setValues(initialValues);
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        //fieldset에 감싼 요소인지 판단 (checkbox Group, radio Group이 여기에 해당)
        const fieldset = event.target.closest('fieldset');
        const name = fieldset ? fieldset.getAttribute('name')! : event.target.name;
        setValues({ ...values, [name]: value });

        //유효성 검사가 있다면 검사
        if (validate) {
            const result = validate({ ...values, [name]: value });
            setMessages(result.messages);
            setValids(result.valids);
        }
    };
    const handleCheckboxGroupChange = (name: string, selectedValues: string[]) => {
        const newValues = { ...values, [name]: selectedValues };

        setValues(newValues);

        const result = validate(newValues);
        setMessages(result.messages);
        setValids(result.valids);
    };

    const handleRadioGroupChange = (name: string, selectedValue: string) => {
        const newValues = { ...values, [name]: selectedValue };

        setValues(newValues);

        const result = validate(newValues);
        setMessages(result.messages);
        setValids(result.valids);
    };

    const handleSubmit = async (event: FormEvent) => {
        setSubmitting(true);
        event.preventDefault();

        await new Promise((r) => setTimeout(r, 1000));
    };

    useEffect(() => {
        if (submitting) {
            onSubmit(values);
        }
        setSubmitting(false);
    }, [submitting]);
    return {
        values,
        submitting,
        messages,
        valids,
        handleChange,
        handleCheckboxGroupChange,
        handleRadioGroupChange,
        handleSubmit,
    };
};

export default useForm;
