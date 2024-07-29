import Radio from '@components/common/radio/Radio';
import RadioGroup from '@components/common/radio/RadioGroup';
import { useRadioValueStore } from '@stores/common/radioStore';

const SignupPage = () => {
    const checkedValue = useRadioValueStore();
    return (
        <div>
            <RadioGroup className="flex flex-col">
                <Radio value={'남자'}>남자</Radio>
                <Radio value={'여자'}>여자</Radio>
            </RadioGroup>
            <p>{checkedValue}</p>
        </div>
    );
};

export default SignupPage;
