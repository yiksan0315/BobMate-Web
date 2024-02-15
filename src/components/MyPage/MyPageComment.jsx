import { React, useState } from 'react';
import headerLogo from '../images/bxs_bowl-rice.png';
import SaveButton from './SaveButton';
import StyledInput from './StyledInputWrapper';
import axios from 'axios';



export default function MyPageComment() {
    const [comments, setComments] = useState({
        emotion: "",
        food: "",
        genre: ""
    })
    const accessToken = localStorage.getItem('accessToken');  // localStorage에서 accessToken 가져오기

    const handleOnChange = (e) => {
        setComments({
            ...comments,
            [e.target.name]: e.target.value
        })
    }

    const commentSave = () => {
        console.log('코멘트 저장 버튼 클릭');
        console.log(comments);

        // 확인: accessToken이 존재하는지
        if (!accessToken) {
            console.error('accessToken이 존재하지 않습니다.');
            return;
        }

        // axios를 사용하여 서버에 데이터 전송
        axios.post(`/api/v1/members/comment`, comments,
            {
                headers: {
                    'Content-Type': 'application/json', // 필요에 따라 Content-Type을 설정
                    'Authorization': accessToken // yourAccessToken에 실제 토큰을 넣어주세요
                }
            }
        )
            .then(response => {
                // 성공적으로 응답 받았을 때 수행할 작업
                console.log(response.data);
                alert("저장완료 "+comments.emotion+":" +comments.food+":"+comments.genre);
            })
            .catch(error => {
                // 여기서 에러 메시지 출력
                console.error('에러 발생:', error);

                // 에러 응답이 있다면 에러 응답의 데이터를 출력
                if (error.response) {
                    console.error('에러 응답 데이터:', error.response.data);
                }
            });

    };
    return (
        <div className='mypage-comment-wrap' style={{ margin: '30px', display: 'flex', flexDirection: 'column' }} >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft: '500px' }}>
                <img src={headerLogo} alt='header logo' style={{ marginRight: '15px', width: '25px' }} />
                <p style={{ fontSize: '20px' }}>오늘의 한 줄 코멘트를 완성해 주세요!</p>
            </div>
            <div className='comment-box' style={{
                border: '2px solid #000', padding: '10px', borderRadius: '20px', width: '47%', height: '200px', alignItems: 'center', display: 'flex', justifyContent: 'center',
                flexDirection: 'column', marginLeft: '26%', marginTop: '20px'
            }}>
                <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                    <p style={{ fontSize: '20px', margin: '5px' }}>나는</p>
                    <StyledInput placeholder="😊감정 입력" name="emotion" isCentered={true} style={{ width: '200px' }}
                        onChange={handleOnChange} />
                    <p style={{ fontSize: '20px', margin: '5px' }}>일 때</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                    <StyledInput placeholder="🍚음식 입력" name="food" isCentered={true} style={{ width: '200px' }}
                        onChange={handleOnChange} />
                    <p style={{ fontSize: '20px', margin: '5px' }}>을 먹으면서</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                    <StyledInput placeholder="🎬장르 입력" name="genre" isCentered={true} style={{ width: '200px' }}
                        onChange={handleOnChange} />
                    <p style={{ fontSize: '20px', margin: '5px' }}>를 봐!</p>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <SaveButton onClick={commentSave}>저장</SaveButton>
            </div>
        </div>

    )
}