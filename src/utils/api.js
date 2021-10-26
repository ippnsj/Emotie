import server from "./server";

// 회원
export const register = (nickname, password, rePassword, gender, dateOfBirth, email) => server.post('/members', {nickname: nickname, password: password, passwordCheck: rePassword, gender: gender, dateOfBirth: dateOfBirth, email: email});
export const getUserInfo = () => server.get('/members/me');
export const checkNicknameDuplicated = (nickname) => server.get('/members/nickname', { nickname: nickname });
export const updateUserInfo = (nickname, gender, birth) => server.put('/members', { nickname: nickname, gender: gender, dateOfBirth: birth });
export const changePassword = (currentPassword, password, passwordCheck) => server.put('/members/password', { currentPassword: currentPassword, password: password, passwordCheck: passwordCheck });
export const deleteAccount = (currentPassword, reason) => server.delete('/members', { currentPassword: currentPassword, reason: reason });
export const follow = (uuid, state) => server.post(`/members/follow/${uuid}`, { isFollowing: state });

// 인증
export const pwResetEmail = (email) => server.post(`/auth/password-reset?email=${email}`);
export const pwResetCheck = (token, email, password, passwordCheck) => server.put(`/auth/password-reset?passwordRestToken=${token}`, {email: email, password: password, passwordCheck: passwordCheck});
export const activateAccount = (email, token) => server.put(`/auth/authorization?email=${email}&authorizationToken=${token}`);
export const login = ({ email, password }) => server.post('/auth/login', { email: email, password: password });

// 다이어리
export const uploadPost = (emotion, content, isPrivate) => server.post('/diaries', { emotion: emotion, content: content, isOpened:  isPrivate });
export const blur = (id) => server.post(`/diaries/blind/${id}`); // api 구현 후 수정 필요
export const reportDiary = (id, reason) => server.post(`/diaries/report/${id}`, { reason: reason });
export const deleteDiary = (id) => server.delete('/diaries', { id: [id] });
export const getFeeds = (pageNumber) => server.get(`/feed?page=${pageNumber}`);

// 방명록
export const reportGuestbook = (id, reason) => server.post(`/guestbooks/report/${id}`, { reason: reason });
export const deleteGuestbook = (id) => server.delete(`/guestbooks/${id}`);

// 프로필
export const getProfileInfo = (uuid) => server.get(`/profiles/${uuid}`);
export const editIntroduction = (introduction) => server.put('/profiles', { introduction: introduction });
export const getRecommends = () => server.get('/recommend');
