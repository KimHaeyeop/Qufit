import { HOBBY, MBTI, PERSONALITY } from '@components/auth/SignupConstants';
import Checkbox from '@components/common/checkbox/Checkbox';
import CheckboxGroup from '@components/common/checkbox/CheckboxGroup';
import Input from '@components/common/input/Input';
import useForm from '@hooks/useForm';

interface InfoProps {
    onNext?: () => void;
}

const TypeInfo = ({ onNext }: InfoProps) => {
    const { values, submitting, messages, valids, handleChange, handleCheckboxGroupChange, handleSubmit } = useForm({
        initialValues: {
            typeAgeMax: '',
            typeAgeMin: '',
            typeMBTITag: [],
            typeHobbyTag: [],
            typePersonalityTag: [],
        },
        onSubmit: () => {
            console.log(1);
        },
    });
    return (
        <p>
            <Input name="typeAgeMax" label="최대 나이" value={values.typeAgeMax} onChange={handleChange} />
            <Input name="typeAgeMin" label="최소 나이" value={values.typeAgeMin} onChange={handleChange} />
            <CheckboxGroup
                className="flex flex-wrap"
                onChange={(values) => handleCheckboxGroupChange('typeMBTITag', values)}
                values={values.typeMBTITag}
            >
                {MBTI.map((mbti) => (
                    <Checkbox value={mbti}>{mbti}</Checkbox>
                ))}
            </CheckboxGroup>

            <CheckboxGroup
                label="취미"
                className="flex flex-wrap"
                onChange={(values) => handleCheckboxGroupChange('typeHobbyTag', values)}
                values={values.typeHobbyTag}
            >
                {HOBBY.map((hobby) => (
                    <Checkbox value={hobby}>{hobby}</Checkbox>
                ))}
            </CheckboxGroup>

            <CheckboxGroup
                label="성격"
                className="flex flex-wrap"
                onChange={(values) => handleCheckboxGroupChange('typePersonalityTag', values)}
                values={values.typePersonalityTag}
            >
                {PERSONALITY.map((personality) => (
                    <Checkbox value={personality}>{personality}</Checkbox>
                ))}
            </CheckboxGroup>
        </p>
    );
};

export default TypeInfo;
