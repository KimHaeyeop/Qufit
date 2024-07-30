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
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setValues({ ...values, [name]: value });

        //유효성 검사가 있다면 검사
        if (validate) {
            const result = validate({ ...values, [name]: value });
            setMessages(result.messages);
            setValids(result.valids);
        }
    };

    const handleSubmit = (event: FormEvent) => {
        setSubmitting(true);
        event.preventDefault();
    };

    useEffect(() => {
        if (submitting) {
            onSubmit(values);
        }
        setSubmitting(false);
    }, [submitting]);
    return { values, submitting, messages, valids, handleChange, handleSubmit };
};

export default useForm;
