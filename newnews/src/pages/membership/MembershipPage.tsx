import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/Button"
import styles from "@styles/membership/MemberShipPage.module.scss";
import axios from "axios";
import { SERVER_URL } from "@/utils/urls"

interface Iprops{
	username : string
    password : string
	passwordChk : string
	sex : string
	yearOfBirth : React.ReactNode
}

export function MemberShipPage() {
    const navigate = useNavigate()
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

    async function onSubmitMemberShip({username, password, passwordChk, sex, yearOfBirth}: Iprops) {
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
            setTimeout(()=> {
                navigate("/login");
            }, 2000);
            })
            } catch (err) {
            console.error(err)
            }
        } 
    
    

    //email 
    const onChangeUsername = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const usernameRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const usernameCurrent = e.target.value
        setUsername(usernameCurrent)

        if (!usernameRegex.test(usernameCurrent)) {
        setUsernameMessage('이메일 형식이 틀렸어요')
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
            setPasswordChkMessage('비밀번호를 똑같이 입력했어요')
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
            <form >
            <div className={styles.email}>
                <p>이메일</p>
                    <input type="email" onChange={onChangeUsername} />
                    {username.length > 0 && <span className={`message ${isusername ? 'success' : 'error'}`}>{usernameMessage}</span>}
            </div>
            <div className={styles.password}>
                <p>비밀번호</p>
                    <input type="password" onChange={onChangePassword} placeholder="특수문자와 숫자를 포함한 8자리이상 입력해주세요."/>
                    {password.length > 0 && (
                    <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
                    )}
            </div>
            <div className={styles.passwordConfirm}>
                <p>비밀번호 확인</p>
                    <input type="password" onChange={onChangePasswordChk} />
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
            </form>
            <div className={styles.buttonGrid}>
                <Button children={"가입하기"} onClick={()=>{onSubmitMemberShip({username, password, passwordChk, sex, yearOfBirth})}}></Button>
            </div>
        </section>
    )
}