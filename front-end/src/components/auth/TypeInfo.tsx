import { MemberInfoDTO } from '@apis/types/request';
import MultipleTag from '@components/auth/MultipleTag';
import MultipleTagGroup from '@components/auth/MultipleTagGroup';
import { HOBBY, MBTI, PERSONALITY } from '@components/auth/SignupConstants';
import Input from '@components/common/input/Input';
import useForm from '@hooks/useForm';

interface InfoProps {
    onNext: (data: MemberInfoDTO) => void;
    registData: MemberInfoDTO;
}

const TypeInfo = ({ onNext, registData }: InfoProps) => {
    console.log(registData);
    const { values, submitting, messages, valids, handleChange, handleCheckboxGroupChange, handleSubmit } = useForm({
        initialValues: {
            ...registData,
            typeAgeMax: 0,
            typeAgeMin: 0,
            typeMBTITags: [''],
            typeHobbyTags: [''],
            typePersonalityTags: [''],
        },
        onSubmit: onNext,
    });
    return (
        <>
            <button onClick={handleSubmit}>회원가입 제출</button>
            <Input name="typeAgeMax" label="최대 나이" value={values.typeAgeMax.toString()} onChange={handleChange} />
            <Input name="typeAgeMin" label="최소 나이" value={values.typeAgeMin.toString()} onChange={handleChange} />
            <MultipleTagGroup
                onChange={(values) => handleCheckboxGroupChange('typeMBTITags', values)}
                values={values.typeMBTITags}
            >
                {MBTI.map((mbti) => (
                    <MultipleTag key={mbti} value={mbti}>
                        {mbti}
                    </MultipleTag>
                ))}
            </MultipleTagGroup>

            <MultipleTagGroup
                label="취미"
                onChange={(values) => handleCheckboxGroupChange('typeHobbyTags', values)}
                values={values.typeHobbyTags}
            >
                {HOBBY.map((hobby) => (
                    <MultipleTag key={hobby} value={hobby}>
                        {hobby}
                    </MultipleTag>
                ))}
            </MultipleTagGroup>

            <MultipleTagGroup
                label="성격"
                onChange={(values) => handleCheckboxGroupChange('typePersonalityTags', values)}
                values={values.typePersonalityTags}
            >
                {PERSONALITY.map((personality) => (
                    <MultipleTag key={personality} value={personality}>
                        {personality}
                    </MultipleTag>
                ))}
            </MultipleTagGroup>
        </>
    );
};

export default TypeInfo;
