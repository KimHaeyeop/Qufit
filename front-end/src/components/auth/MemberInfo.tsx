import RadioGroup from '@components/common/radio/RadioGroup';
import { GENDER, HOBBY, LOCATION, MBTI, PERSONALITY } from '@components/auth/SignupConstants';
import Checkbox from '@components/common/checkbox/Checkbox';
import CheckboxGroup from '@components/common/checkbox/CheckboxGroup';
import Radio from '@components/common/radio/Radio';
import useForm from '@hooks/useForm';
import Input from '@components/common/input/Input';
import TextArea from '@components/common/input/TextArea';
import { MemberData, MemberInfoDTO, TypeData } from '@apis/types/request';

interface InfoProps {
    onNext: (data: MemberData | TypeData | MemberInfoDTO) => void;
}
const MemberInfo = ({ onNext }: InfoProps) => {
    const { values, submitting, messages, valids, handleChange, handleCheckboxGroupChange, handleSubmit } = useForm({
        initialValues: {
            nickname: '',
            birthYear: 0,
            bio: '',
            gender: '',
            locationId: 0,
            memberMBTITag: '',
            memberHobbyTag: [],
            memberPersonalityTag: [],
        },
        onSubmit: onNext,
    });
    return (
        <>
            <button onClick={handleSubmit}>다음</button>
            <Input name="nickname" label="닉네임" value={values.nickname} onChange={handleChange} />
            <Input name="birthYear" label="태어난 연도" value={values.birthYear.toString()} onChange={handleChange} />
            <TextArea name="bio" label="자기소개" value={values.bio} onChange={handleChange} />
            <RadioGroup
                label="성별"
                className="flex flex-wrap"
                name="gender"
                onChange={handleChange}
                value={values.gender}
            >
                {GENDER.map((gender) => (
                    <Radio key={gender} value={gender} className="w-20 h-20 text-5xl">
                        {gender}
                    </Radio>
                ))}
            </RadioGroup>

            <RadioGroup
                label="지역"
                className="flex flex-wrap gap-16"
                name="locationId"
                onChange={handleChange}
                value={values.locationId.toString()}
            >
                {LOCATION.map((location) => (
                    <Radio key={location.code} value={location.code} className="w-20 h-20 ">
                        {location.name}
                    </Radio>
                ))}
            </RadioGroup>

            <CheckboxGroup
                label="취미"
                className="flex flex-wrap"
                onChange={(values) => handleCheckboxGroupChange('memberHobbyTag', values)}
                values={values.memberHobbyTag}
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
                onChange={(values) => handleCheckboxGroupChange('memberPersonalityTag', values)}
                values={values.memberPersonalityTag}
            >
                {PERSONALITY.map((personality) => (
                    <Checkbox key={personality} value={personality}>
                        {personality}
                    </Checkbox>
                ))}
            </CheckboxGroup>

            <RadioGroup
                label="MBTI(선택)"
                className="flex flex-wrap gap-16"
                name="memberMBTITag"
                onChange={handleChange}
                value={values.memberMBTITag}
            >
                {MBTI.map((mbti) => (
                    <Radio key={mbti} value={mbti} className="w-20 h-20 text-5xl">
                        {mbti}
                    </Radio>
                ))}
            </RadioGroup>
        </>
    );
};

export default MemberInfo;
