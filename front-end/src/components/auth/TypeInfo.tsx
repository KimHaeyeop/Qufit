import { MemberData, TypeData } from '@apis/types/request';
import { MemberInfoDTO } from '@apis/types/request';
import { HOBBY, MBTI, PERSONALITY } from '@components/auth/SignupConstants';
import Checkbox from '@components/common/checkbox/Checkbox';
import CheckboxGroup from '@components/common/checkbox/CheckboxGroup';
import Input from '@components/common/input/Input';
import useForm from '@hooks/useForm';

interface InfoProps {
    onNext: (data: MemberInfoDTO) => void;
    registData: MemberInfoDTO;
}

const TypeInfo = ({ onNext, registData }: InfoProps) => {
    const { values, submitting, messages, valids, handleChange, handleCheckboxGroupChange, handleSubmit } = useForm({
        initialValues: {
            ...registData,
            typeAgeMax: 0,
            typeAgeMin: 0,
            typeMBTITag: [''],
            typeHobbyTag: [''],
            typePersonalityTag: [''],
        },
        onSubmit: onNext,
    });
    return (
        <>
            <button onClick={handleSubmit}>회원가입 제출</button>
            <Input name="typeAgeMax" label="최대 나이" value={values.typeAgeMax.toString()} onChange={handleChange} />
            <Input name="typeAgeMin" label="최소 나이" value={values.typeAgeMin.toString()} onChange={handleChange} />
            <CheckboxGroup
                className="flex flex-wrap"
                onChange={(values) => handleCheckboxGroupChange('typeMBTITag', values)}
                values={values.typeMBTITag}
            >
                {MBTI.map((mbti) => (
                    <Checkbox key={mbti} value={mbti}>
                        {mbti}
                    </Checkbox>
                ))}
            </CheckboxGroup>

            <CheckboxGroup
                label="취미"
                className="flex flex-wrap"
                onChange={(values) => handleCheckboxGroupChange('typeHobbyTag', values)}
                values={values.typeHobbyTag}
            >
                {HOBBY.map((hobby) => (
                    <Checkbox key={hobby} value={hobby}>
                        {hobby}
                    </Checkbox>
                ))}
            </CheckboxGroup>

            <CheckboxGroup
                label="성격"
                className="flex flex-wrap"
                onChange={(values) => handleCheckboxGroupChange('typePersonalityTag', values)}
                values={values.typePersonalityTag}
            >
                {PERSONALITY.map((personality) => (
                    <Checkbox key={personality} value={personality}>
                        {personality}
                    </Checkbox>
                ))}
            </CheckboxGroup>
        </>
    );
};

export default TypeInfo;
