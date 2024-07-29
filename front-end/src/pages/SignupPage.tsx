import Checkbox from '@components/common/checkbox/Checkbox';
import CheckboxGroup from '@components/common/checkbox/CheckboxGroup';
import Radio from '@components/common/radio/Radio';
import RadioGroup from '@components/common/radio/RadioGroup';
import { useState } from 'react';

const SignupPage = () => {
    const [gender, setGender] = useState('');
    const [hobby, setHobby] = useState('');
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

            {/* <CheckboxGroup>
                <Checkbox>남자</Checkbox>
                <Checkbox>여자</Checkbox>
            </CheckboxGroup> */}
        </div>
    );
};

export default SignupPage;
