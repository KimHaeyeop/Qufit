import Checkbox from '@components/common/checkbox/Checkbox';
import CheckboxGroup from '@components/common/checkbox/CheckboxGroup';
import Radio from '@components/common/radio/Radio';
import RadioGroup from '@components/common/radio/RadioGroup';
import { useState } from 'react';

const SignupPage = () => {
    const [gender, setGender] = useState('');
    const [hobby, setHobby] = useState('');
    const [mbti, setMbti] = useState<string[]>([]);
    return (
        <div>
            <p>{gender}</p>
            <RadioGroup className="flex flex-col" value={gender} onChange={setGender}>
                <Radio value={'남자'}>남자</Radio>
                <Radio value={'여자'}>여자</Radio>
            </RadioGroup>

            <p>{hobby}</p>
            <RadioGroup className="flex flex-col" value={hobby} onChange={setHobby}>
                <Radio value={'취미'}>취미</Radio>
                <Radio value={'성향'}>성향</Radio>
            </RadioGroup>

            <p>{mbti}</p>
            <CheckboxGroup className="flex flex-col" values={mbti} onChange={setMbti}>
                <Checkbox value={'ENFP'}>ENFP</Checkbox>
                <Checkbox value={'ESTJ'}>ESTJ</Checkbox>
                <Checkbox value={'INFP'}>INFP</Checkbox>
            </CheckboxGroup>
        </div>
    );
};

export default SignupPage;
