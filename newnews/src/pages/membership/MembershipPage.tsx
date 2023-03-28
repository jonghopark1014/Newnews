import { useState, useCallback } from "react";
import { Button } from "@components/Button"
import styles from "@styles/membership/MemberShipPage.module.scss";
import { useEffect } from "react";

export function MemberShipPage() {
    //email, password, passwordConfirm 확인
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const [sex, setSex] = useState<string>('')
    const [date, setDate] = useState<number>()
    //message상태 저장
    const [emailMessage, setEmailMessage] = useState<string>('')
    const [passwordMessage, setPasswordMessage] = useState<string>('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>('')
    // 유효성 검사
    const [isEmail, setIsEmail] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false)
    //email 
    const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value
        setEmail(emailCurrent)

        if (!emailRegex.test(emailCurrent)) {
        setEmailMessage('이메일 형식이 틀렸어요')
        setIsEmail(false)
        } else {
        setEmailMessage('올바른 이메일 형식입니다')
        setIsEmail(true)
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
    const onChangePasswordConfirm = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordConfirmCurrent = e.target.value
        setPasswordConfirm(passwordConfirmCurrent)

        if (password === passwordConfirmCurrent) {
            setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요')
            setIsPasswordConfirm(true)
        } else {
            setPasswordConfirmMessage('비밀번호가 틀렸습니다')
            setIsPasswordConfirm(false)
        }
        },
        [password]
    )
    /**
     * 날짜 6자리만 받아옴
     */
    const onChangedate = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let dateCurrentString = e.target.value
        
        if(dateCurrentString.length > e.target.maxLength){
            dateCurrentString = dateCurrentString.slice(0, e.target.maxLength);
        }
        const dateCurrent = parseInt(dateCurrentString)
        setDate(dateCurrent)
    },[])

    // 성별 체크박스 
    const isCheckBox = useCallback((e: React.MouseEvent<HTMLInputElement>) => {

        let checkPick = document.getElementsByName('sexCheckBox');
        Array.prototype.forEach.call(checkPick, function (el) {
            console.log('el', el);
            console.log('el', el.checked);
            el.checked = false;
        });
        (e.target as HTMLInputElement).checked = true;

        setSex((e.target as HTMLInputElement).value)
        console.log(setSex((e.target as HTMLInputElement).defaultValue))
        console.log(sex)

    },[])

    return(
        <section className={styles.sectionStyles}>
            <form >
            <div className={styles.email}>
                <p>이메일</p>
                    <input type="email" onChange={onChangeEmail} />
                    {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
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
                    <input type="password" onChange={onChangePasswordConfirm} />
                    {passwordConfirm.length > 0 && (
                    <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
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
                <input type="number" placeholder="ex) 900101" required aria-required="true" maxLength={6} onChange={onChangedate}/>
            </div>
            </form>
            <div className={styles.buttonGrid}>
                <Button onClick={() => {}} children={"가입하기"}></Button>
            </div>
        </section>
    )
}