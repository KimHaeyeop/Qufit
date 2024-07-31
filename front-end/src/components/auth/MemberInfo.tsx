import RadioGroup from '@components/common/radio/RadioGroup';
import { GENDER, HOBBY, LOCATION, MBTI, PERSONALITY } from '@components/auth/SignupConstants';
import Checkbox from '@components/common/checkbox/Checkbox';
import CheckboxGroup from '@components/common/checkbox/CheckboxGroup';
import Radio from '@components/common/radio/Radio';
import useForm from '@hooks/useForm';
import Input from '@components/common/input/Input';
import TextArea from '@components/common/input/TextArea';
import { MemberData, MemberInfoDTO, TypeData } from '@apis/types/request';
import MultipleSelectionTag from '@components/auth/MultipleTag';
import MultipleTag from '@components/auth/MultipleTag';
import SingleTag from '@components/auth/SingleTag';
import MultipleTagGroup from '@components/auth/MultipleTagGroup';
import SingleTagGroup from '@components/auth/SingleTagGroup';

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
            memberHobbyTags: [],
            memberPersonalityTags: [],
        },
        onSubmit: onNext,
    });
    return (
        <>
            <button onClick={handleSubmit}>다음</button>
            <p className="text-4xl font-bold">회원가입</p>
            <div className="flex">
                <div className="flex flex-col w-1/2 gap-4 px-10">
                    {/* 닉네임 */}
                    <Input name="nickname" label="닉네임" value={values.nickname} onChange={handleChange} />

                    {/* 태어난연도 */}
                    <Input
                        name="birthYear"
                        label="태어난 연도"
                        value={values.birthYear.toString()}
                        onChange={handleChange}
                    />

                    {/* 자기소개 */}
                    <TextArea name="bio" label="자기소개" value={values.bio} onChange={handleChange} rows={10} />

                    {/* 성별 */}
                    <SingleTagGroup label="성별" name="gender" onChange={handleChange} value={values.gender}>
                        {GENDER.map((gender) => (
                            <SingleTag key={gender.param} value={gender.param}>
                                {gender.text}
                            </SingleTag>
                        ))}
                    </SingleTagGroup>

                    {/* 지역 */}
                    <SingleTagGroup
                        label="지역"
                        name="locationId"
                        onChange={handleChange}
                        value={values.locationId.toString()}
                    >
                        {LOCATION.map((location) => (
                            <SingleTag key={location.code} value={location.code}>
                                {location.name}
                            </SingleTag>
                        ))}
                    </SingleTagGroup>
                </div>

                <div className="flex flex-col w-1/2 gap-4">
                    {/* 취미 */}
                    <MultipleTagGroup
                        label="취미"
                        onChange={(values) => handleCheckboxGroupChange('memberHobbyTags', values)}
                        values={values.memberHobbyTags}
                    >
                        {HOBBY.map((hobby) => (
                            <>
                                <MultipleTag key={hobby} value={hobby}>
                                    {hobby}
                                </MultipleTag>
                            </>
                        ))}
                    </MultipleTagGroup>

                    {/* 성격 */}
                    <MultipleTagGroup
                        label="성격"
                        onChange={(values) => handleCheckboxGroupChange('memberPersonalityTags', values)}
                        values={values.memberPersonalityTags}
                    >
                        {PERSONALITY.map((personality) => (
                            <MultipleTag key={personality} value={personality}>
                                {personality}
                            </MultipleTag>
                        ))}
                    </MultipleTagGroup>

                    {/* MBTI(선택) */}
                    <SingleTagGroup
                        label="MBTI(선택)"
                        name="memberMBTITag"
                        onChange={handleChange}
                        value={values.memberMBTITag}
                    >
                        {MBTI.map((mbti) => (
                            <SingleTag key={mbti} value={mbti}>
                                {mbti}
                            </SingleTag>
                        ))}
                    </SingleTagGroup>
                </div>
            </div>
        </>
    );
};

export default MemberInfo;
