import React, { useEffect, useState } from "react";

import { 
    Container, ContentLayout, 
    CategoryLayout, Category,
    FrameLayout, Group, Description
} from "./style";
import Header from "../../common/Header";
import PillButton from "../../common/PillButton";
import PillInput from "../../common/PillInput";



// 임시
import styled from "styled-components";

function RadioGroup(props) {
    const onOptionChanged = (event) => props.handleState(event.target.value * 1);

    return (
        <>{props.options.map((option, index) => (
            <RadioWrapper key={index}>
                <Radio type="radio" value={index} onChange={onOptionChanged} checked={props.state === index}/>
                {option}
            </RadioWrapper>
        ))}</>
    );
}
const RadioWrapper = styled.label`
    font-size: 0.9rem;
    color: white;
`
const Radio = styled.input`
    margin-right: 10px;
    appearance: none;
    width: 10px;
    height: 10px;
    border: 1px solid white;
    border-radius: 50%;

    &:checked {
        background-color: lightgray;
    }
    &:hover {
        background-color: white;
    }
`
// 임시



function SettingPage(props) {
    const [category, setCategory] = useState(0);

    const [deletingReason, setDeletingReason] = useState(0);

    useEffect(() => {
        setCategory(0);
    }, []);

    // Fragment
    const settings = () => {
        switch(category) {
            case 0:
                return (
                    <FrameLayout>

                    </FrameLayout>
                );
            case 1:
                return (
                    <FrameLayout>

                    </FrameLayout>
                );
            case 2:
                return (
                    <FrameLayout>
                        <Group>
                            <Description>
                                <strong>공릉동 공룡 (hy0903@yonsei.ac.kr)</strong> 계정을 삭제합니다. 
                                삭제 즉시 계정 사용이 제한되며 마음글을 비롯한 모든 정보가 모두 비공개 처리됩니다. 
                                데이터는 한 달 간 보관 후 자동으로 삭제 됩니다.
                                한 달 내 재로그인시 계정이 활성화되며 계정 삭제 요청이 취소됩니다.
                            </Description>
                        </Group>
                        <Group>
                            <Description>아래의 사유로 계정을 삭제합니다.</Description>
                            <RadioGroup 
                                state={deletingReason} 
                                handleState={setDeletingReason}
                                options={[
                                    "더 이상 해당 서비스를 이용할 필요를 느끼지 않습니다.",
                                    "부적절한 서비스 이용자가 많습니다.",
                                    "서비스 이용 중 문제가 다수 발생하였습니다.",
                                    "새로운 계정을 생성합니다.",
                                    "기타"
                                ]}/>
                        </Group>
                        <Group>
                            <Description>비밀번호 확인</Description>
                            <PillInput width="300px" placeholder="비밀번호"/>
                        </Group>
                        <Group>
                            <Description>정말로 삭제하시겠습니까?</Description>
                            <PillButton width="150px">계정 삭제</PillButton>
                        </Group>
                    </FrameLayout>
                );
            default:
                return null;
        }
    }

    return (
        <Container>
            <Header recommend feed/>
            <ContentLayout>
                <CategoryLayout>
                    <Category onClick={() => setCategory(0)} selected={category === 0}>개인정보 관리</Category>
                    <Category onClick={() => setCategory(1)} selected={category === 1}>비밀번호 변경</Category>
                    <Category onClick={() => setCategory(2)} selected={category === 2}>계정 삭제</Category>
                </CategoryLayout>
                {settings()}
            </ContentLayout>
        </Container>
    );
}

export default SettingPage;