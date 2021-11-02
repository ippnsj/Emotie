import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useProfileInfo from "../../../hooks/useProfileInfo";

import * as api from "../../../utils/api";

import { Container, Group, Element } from "./component";
import Alert from "../../common/modal/Alert";

function ProfilePage(props) {
    // 프로필 정보
    const { memberId } = useParams();

    const { profileInfo, isProfileMine, setProfileInfo } = useProfileInfo(memberId);

    // 수정할 수 있는 데이터
    const [tempIntroduction, setTempIntroduction] = useState('');
    const [tempMotieItems, setTempMotieItems] = useState();
    useEffect(() => setTempIntroduction(profileInfo.introduction), [profileInfo.introduction]);
    useEffect(() => setTempMotieItems(profileInfo.motieItems), [profileInfo.motieItems]);

    // 인터페이스
    const [category, setCategory] = useState(0);
    const [isEditable, setEditable] = useState(false);
    const [isCancelAlertOpen, setCancelAlertOpen] = useState(false);
    const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);

    // 클릭 이벤트 (본인 프로필)
    const startEdit = () => setEditable(true);
    const saveEdit = async () => {
        try {
            await api.editIntroduction(tempIntroduction);
            // await api.editMotieItems(tempMotieItems);
            setProfileInfo({ ...profileInfo, introduction: tempIntroduction, motieItems: tempMotieItems });
            setEditable(false);
        }
        catch(error) {
            showErrorAlert();
            cancelEdit();
        }
    };
    const cancelEdit = () => {
        setTempIntroduction(profileInfo.introduction);
        setTempMotieItems(profileInfo.motieItems);
        setEditable(false);
    }
    const write = () => props.history.push(`/write`);

    // 클릭 이벤트 (타인 프로필)
    const toggleFollow = () => {
        api.toggleFollow(memberId)
        .then(response => setProfileInfo({ ...profileInfo, followed: response.data.isFollowing }))
        .catch(error => showErrorAlert());
    }

    // 알림
    const showErrorAlert = () => setErrorAlertOpen(true);
    const showCancelAlert = () => setCancelAlertOpen(true);
    
    return (
        <Container.Base backgroundColor={profileInfo.allEmotion.color}>
            {/* 헤더 */}
            <Element.Header/>
            {/* 모티 */}
            <Group.Motie 
                motie={profileInfo.motie} motieItems={tempMotieItems} 
                setTempMotieItems={setTempMotieItems}
                isEditable={isEditable}/>
            {/* 내용 */}
            <Container.Content>
                <Container.Profile backgroundColor={profileInfo.allEmotion.color}>
                    <Group.Info 
                        nickname={profileInfo.nickname} introduction={tempIntroduction}
                        setTempIntroduction={setTempIntroduction} 
                        isEditable={isEditable}/>
                    <Group.State 
                        follower={profileInfo.followers} followee={profileInfo.followees}
                        isProfileMine={isProfileMine} isEditable={isEditable}/>
                    <Group.Menu 
                        startEdit={startEdit} saveEdit={saveEdit} cancelEdit={showCancelAlert}
                        write={write} toggleFollow={toggleFollow} 
                        isProfileMine={isProfileMine} isFollowed={profileInfo.followed} isEditable={isEditable}/>
                    <Group.Category 
                        category={category} setCategory={setCategory} 
                        isEditable={isEditable}/>
                    <Group.GuestbookInput 
                        category={category} 
                        isProfileMine={isProfileMine} isEditable={isEditable}/>
                </Container.Profile>
                <Group.Post 
                    category={category} 
                    diaries={profileInfo.diaries} guestbooks={profileInfo.guestbooks} 
                    isProfileMine={isProfileMine} isEditable={isEditable}/>
            </Container.Content>
            {/* 바운더리 */}
            <Element.Boundary backgroundColor={profileInfo.allEmotion.color} top/>
            <Element.Boundary backgroundColor={profileInfo.allEmotion.color} bottom/>
            {/* 모달 */}
            <Alert
                title="프로필 수정 취소"
                message="모티 및 소개글 수정 내역이 저장되지 않습니다."
                firstButton="확인"
                secondButton="취소"
                firstButtonFunc={cancelEdit}
                isOpen={isCancelAlertOpen}
                setOpen={setCancelAlertOpen}/>
            <Alert
                title="오류"
                message="서버와의 통신 중 오류가 발생하였습니다."
                isOpen={isErrorAlertOpen}
                setOpen={setErrorAlertOpen}/>
        </Container.Base>
    );
}

export default ProfilePage;