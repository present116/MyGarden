import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action' // action은 따로 모아두기
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const [EamilErr, setEmailErr] = useState("");
    const [PasswordErr, setPasswordErr] = useState("");
    const [ConfirmPwErr, setConfirmPwErr] = useState("");
    const [NameErr, setNameErr] = useState("");


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);  
        
        const pattern=/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z]?)*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if(!pattern.test(event.currentTarget.value)){
            setEmailErr(true);       
        }else{
            setEmailErr(false);       
        }
        
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
        const pattern = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]*$/;
        if(!pattern.test(event.currentTarget.value)){
            setNameErr(true);       
        }else{
            setNameErr(false);       
        }
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)

        const pattern =  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
        if(!pattern.test(event.currentTarget.value)){
            setPasswordErr(true);       
        }else{
            setPasswordErr(false);       
        }
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)

        const pattern = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
        if(!pattern.test(event.currentTarget.value)){
            setConfirmPwErr(true);       
        }else{
            setConfirmPwErr(false);       
        }

    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다");
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        dispatch(registerUser(body))
            .then(res => {
                if (res.payload.success) {
                    alert("회원가입 성공하였습니다")
                    navigate("/")
                } else {
                    alert("실패")
                }
            })

    }


    return (
        
        <div className="container">
            <div className="inner">
                <div className="content">
                    <form id="join_form" method="post" onSubmit={onSubmitHandler}>
                        <div className="form_content">

                            <h1 class="tit_header">독서의 정원</h1>
                            <h3 class="tit_sub">독서의 정원에 오신걸 환영합니다. <br />회원가입 하시면 더 많은 서비스를 이용하실 수 있습니다.</h3>
                            <div className="form_section">
                                <div className="form_list">
                                    <div className="form_item email" id="divId">
                                        <input type="text" id="id" name="id" placeholder="이메일" 
                                        className = {[EamilErr ? 'err' : '', 'input'].join(" ")}
                                        value={Email} onChange={onEmailHandler} maxLength="50" autoCapitalize="off" />
                                    </div>
                                    <div className="form_item lock password" id="divPasswd">
                                        <input type="password" id="pswd1" name="pswd1" placeholder="비밀번호" 
                                        className = {[PasswordErr ? 'err' : '', 'input'].join(" ")}
                                        value={Password} onChange={onPasswordHandler} maxLength="20" autocomplete="password" />
                                    </div>
                                    <div className="form_item lock password" id="divPasswd">
                                        <input type="password" id="pswd2" name="pswd2" placeholder="비밀번호 확인" 
                                        className = {[ConfirmPwErr ? 'err' : '', 'input'].join(" ")}
                                        value={ConfirmPassword} onChange={onConfirmPasswordHandler} maxLength="20" autocomplete="new-password" />
                                    </div>
                                    <div className="form_item user" id="divName">
                                        <input type="text" id="name" name="name" placeholder="이름" 
                                        className= {[NameErr ? 'err' : '', 'input'].join(" ")}
                                        value={Name} onChange={onNameHandler} maxLength="40" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn_submit_wrap" id="divBtnAuth">
                            <button type="submit" className="btn_submit" id="btnSend">회원가입</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default RegisterPage