// - 내 정보 입력: 닉네임,성별, 자기 소개, 성격태그, mbti, 거주 지역, 태어난 년도, 취미 태그(다중 선택)
// - 이상형 입력:  성격 태그, mbti, 지역

import MemberInfo from '@components/auth/MemberInfo';
import TypeInfo from '@components/auth/TypeInfo';
import { useState } from 'react';

const SignupPage = () => {
    const [registerData, setRegisterData] = useState();
    const [step, setStep] = useState<'MemberInfo' | 'TypeInfo'>('MemberInfo');

    return (
        <main>
            {step === 'MemberInfo' && (
                <MemberInfo
                    onNext={(data) => {
                        setRegisterData(data);
                        setStep('TypeInfo');
                    }}
                />
            )}
            {step === 'TypeInfo' && <TypeInfo onNext={() => setStep('TypeInfo')} />}
        </main>
    );
};

export default SignupPage;
