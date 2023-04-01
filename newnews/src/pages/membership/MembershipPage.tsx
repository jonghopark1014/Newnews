import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from "axios";

import { LoginState } from "@/states/LoginState";
import { Button } from "@/components/Button"
import MemberShipModal from "@/components/membership/MemberShipModal";
import { SERVER_URL } from "@/utils/urls"
import styles from "@/styles/membership/MemberShipPage.module.scss";

interface Iprops{
	username : string
    password : string
	passwordChk : string
	sex : string
	yearOfBirth : React.ReactNode
    children?: string
}

export function MemberShipPage() {
    const navigate = useNavigate()
    const isLogin = useRecoilValue(LoginState);
    const isLog = isLogin[0].isLogin
    useEffect(() => {
        if (isLog) {
            alert('로그인이 되어있습니다')
            navigate('/');
        }
    }, [isLogin, navigate])


    // 모달창
    const [isUsernameModal, setUsernameModal] = useState<boolean>(false);
    const [isUsernameErrorModal, setUsernameErrorModal] = useState<boolean>(false);
    const [isDuplicationModal, setDuplicationModal] = useState<boolean>(false);
    const [isPasswordModal, setPasswordModal] = useState<boolean>(false);
    const [isSexModal, setSexModal] = useState<boolean>(false);
    const [isEmailModal, setEmailModal ] = useState<boolean>(false);
    
    // 중복검사 통과했는지 안했는지 확인
    const [isMember, setMember] = useState<boolean>(false);

    /**
     * 중복검사 통과했을때 모달창
     */
    const onClickToggleModal = useCallback(() => {
        setUsernameModal(!isUsernameModal);
    }, [isUsernameModal]);
    
    /**
     * 중복검사 통과하지 못했을 때 모달창
     */
    const onClickToggleErrorModal = useCallback(() => {
    setUsernameErrorModal(!isUsernameErrorModal);
    }, [isUsernameErrorModal]);
    /**
     * 중복확인을 누르지 않았을떄 모달창 
     */
    const onClickToggleDuplicationModal = useCallback(() => {
        setDuplicationModal(!isDuplicationModal);
    }, [isDuplicationModal]);
    /**
     * 비밀번호가 같지 않았을때 모달창 
     */
    const onClickTogglePasswordModal = useCallback(() => {
        setPasswordModal(!isPasswordModal);
    }, [isPasswordModal]);
    /**
     * 성별을 체크하지 않고 회원가입을 눌렀을때 모달창 
     */
    const onClickToggleSexModal = useCallback(() => {
        setSexModal(!isSexModal);
    }, [isSexModal]);
    /**
     * 올바르지 이메일을 입력했을때 모달창
     */
    const onClickToggleEmailModal = useCallback(() => {
        setEmailModal(!isEmailModal);
    }, [isEmailModal]);


    //email, password, passwordChk 확인
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordChk, setPasswordChk] = useState<string>('')
    const [sex, setSex] = useState<string>('')
    const [yearOfBirth, setyearOfBirth] = useState<number>()
    
    //message상태 저장
    const [usernameMessage, setUsernameMessage] = useState<string>('')
    const [passwordMessage, setPasswordMessage] = useState<string>('')
    const [passwordChkMessage, setPasswordChkMessage] = useState<string>('')
    
    // 유효성 검사
    const [isusername, setIsUsername] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const [isPasswordChk, setIspasswordChk] = useState<boolean>(false)

    const API = `${SERVER_URL}/api/regist`

    /**
     * 회원가입 API 요청
     * @param param0 유저이름, 비밀번호, 비밀번호확인, 성별, 생년원일
     */
    async function onSubmitMemberShip({username, password, passwordChk, sex, yearOfBirth}: Iprops) {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        
        try {
        await axios
            .post(API, {
            username: username,
            password: password,
            passwordChk: passwordChk,
            sex : sex,
            yearOfBirth : yearOfBirth,
            },
            {
                withCredentials: true,
            })
            .then((res) => {
            console.log('response:', res)
            if (!isMember) {
                onClickToggleDuplicationModal()
            }
            else if (!passwordRegex.test(password)) {
                onClickTogglePasswordModal()
            }
            else if (sex !== 'male' && sex !== 'female') {
                onClickToggleSexModal()
            }
            else{
                setTimeout(()=> {
                    navigate("/login");
                }, 2000);
            }
            })
            } catch (err) {
            console.error(err)
            }
        } 
    
        const USER_NAME_API =`${SERVER_URL}/api/user/exist/`
        /**
         * 중복확인을 하는 요청 axios
         * @param username 유저 이메일
         */
        async function checkUsername(username: string) {
            const usernameRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

            try {
                await axios
                .get(`${USER_NAME_API}${username}`)
                .then((res) => {
                    if (!usernameRegex.test(username)){
                        setIsUsername(false)
                        onClickToggleEmailModal()
                    } else {
                        console.log(res.data.status)
                        setMember(true)
                        onClickToggleModal()
                    }
                })
            } catch (err) {
                console.log(err)
                setUsername('')
                onClickToggleErrorModal()
                
            }
        }

    //email 
    const onChangeUsername = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const usernameRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const usernameCurrent = e.target.value
        setUsername(usernameCurrent)

        if (!usernameRegex.test(usernameCurrent)) {
        setUsernameMessage('이메일 형식이 틀렸습니다')
        setIsUsername(false)
        } else {
        setUsernameMessage('올바른 이메일 형식입니다')
        setIsUsername(true)
        }
    }, [])

    //비밀번호
    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value
        setPassword(passwordCurrent)
    
        if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage('특수문자와 숫자를 포함해서 입력해주세요')
        setIsPassword(false)
        } else {
        setPasswordMessage('안전한 비밀번호에요')
        setIsPassword(true)
        }
    }, [])

    // 비밀번호 확인
    const onChangePasswordChk = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordChkfirmCurrent = e.target.value
        setPasswordChk(passwordChkfirmCurrent)

        if (password === passwordChkfirmCurrent) {
            setPasswordChkMessage('비밀번호를 똑같습니다')
            setIspasswordChk(true)
        } else {
            setPasswordChkMessage('비밀번호가 틀렸습니다')
            setIspasswordChk(false)
        }
        },
        [password]
    )

    /**
     * 날짜 6자리만 받아옴
     */
    const onChangeyearOfBirth = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let yearOfBirthCurrentString = e.target.value
        
        if(yearOfBirthCurrentString.length > e.target.maxLength){
            yearOfBirthCurrentString = yearOfBirthCurrentString.slice(0, e.target.maxLength);
        }
        const yearOfBirthCurrent = parseInt(yearOfBirthCurrentString)
        setyearOfBirth(yearOfBirthCurrent)
    },[])

    // 성별 체크박스 
    const isCheckBox = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
        
        let checkPick = document.getElementsByName('sexCheckBox');
        Array.prototype.forEach.call(checkPick, function (el) {
            
            el.checked = false;
        });
        (e.target as HTMLInputElement).checked = true;
        setSex((e.target as HTMLInputElement).value)

    },[])

    return(
        <section className={styles.sectionStyles}>
            <div className={styles.formStyle} >
                <div className={styles.email}>
                    <div className={styles.emailGrid}>
                        <p>이메일</p>
                        <Button onClick={() => {checkUsername(username)}} children={"중복확인"}/>
                    </div>
                        <input type="email" onChange={onChangeUsername} value={username} placeholder="이메일을 입력해주세요"/>
                        {username.length > 0 && <span className={`message ${isusername ? 'success' : 'error'}`}>{usernameMessage}</span>}
                </div>
                <div className={styles.password}>
                    <p>비밀번호</p>
                        <input type="password" onChange={onChangePassword} value={password}  placeholder="특수문자와 숫자를 포함한 8자리이상 입력해주세요."/>
                        {password.length > 0 && (
                        <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
                        )}
                </div>
                <div className={styles.passwordConfirm}>
                    <p>비밀번호 확인</p>
                        <input type="password" onChange={onChangePasswordChk} value={passwordChk} />
                        {passwordChk.length > 0 && (
                        <span className={`message ${isPasswordChk ? 'success' : 'error'}`}>{passwordChkMessage}</span>
                        )}
                </div>
                <div className={styles.sex}>
                    <p>성별</p>
                    <div>
                        <div>
                            <label>남</label> <input type="checkbox" name='sexCheckBox' onClick={isCheckBox} value={'male'} />
                        </div>
                        <div>
                            <label>여</label> <input type="checkbox" name='sexCheckBox' onClick={isCheckBox} value={'female'} />
                        </div>
                    </div>
                    
                </div>
                <div className={styles.date}>
                    <p>생년월일</p>
                    <input type="number" placeholder="ex) 900101" required aria-required="true" maxLength={6} onChange={onChangeyearOfBirth}/>
                </div>
            </div>
            { isUsernameModal && <MemberShipModal onClickToggleModal={ onClickToggleModal } children="사용 가능한 아이디입니다"/>}
            { isUsernameErrorModal && <MemberShipModal onClickToggleModal={ onClickToggleErrorModal } children="이미 사용중인 아이디입니다"/>}
            { isDuplicationModal && <MemberShipModal onClickToggleModal={ onClickToggleDuplicationModal } children="중복확인 눌러주세요"/>}
            { isPasswordModal && <MemberShipModal onClickToggleModal={ onClickTogglePasswordModal } children="비밀번호를 확인해주세요"/>}
            { isSexModal && <MemberShipModal onClickToggleModal={ onClickToggleSexModal } children="성별을 선택해주세요"/>}
            { isEmailModal && <MemberShipModal onClickToggleModal={ onClickToggleEmailModal } children="이메일 형식을 확인해주세요"/>}
            <div className={styles.buttonGrid}>
                <Button children={"가입하기"} onClick={()=>{onSubmitMemberShip({username, password, passwordChk, sex, yearOfBirth})}}></Button>
            </div>
        </section>
    )
}