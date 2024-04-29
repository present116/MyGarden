import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action' // action은 따로 모아두기
import { createRoutesFromElements, useNavigate } from 'react-router-dom'

function RegisterPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    
    const [EamilErr, setEmailErr] = useState("");
    const [PasswordErr, setPasswordErr] = useState("");
    const [IdMsg, setIdMsg] = useState("")



    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);  
        
        const pattern=/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z]?)*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if(!pattern.test(event.currentTarget.value)){
            setEmailErr(true);       
            setIdMsg('5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.');
        }else{
            setEmailErr(false);       
        }
        
    }


    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)

        const pattern =  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
        if(!pattern.test(event.currentTarget.value)){
            setPasswordErr(true);       
            setIdMsg('8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.');
        }else{
            setPasswordErr(false);       
        }
    }

    
    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(res => {
                if(res.payload.loginSuccess === 'empty') {
                    alert(res.payload.msg);
                } else if(res.payload.loginSuccess === 'pwErr') {
                    alert(res.payload.msg);
                } else if (res.payload.loginSuccess) {
                    alert("로그인에 성공하였습니다")
                    navigate("/home")
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
                            <h3 class="tit_sub">독서의 정원에 오신걸 환영합니다. <br />로그인을 하시면 더 많은 서비스를 이용하실 수 있습니다.</h3>
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
                                </div>
                                <div className = {[EamilErr || PasswordErr ? 'error_text' : '', 'item_style'].join(" ")} style={{display: EamilErr || PasswordErr ? 'block' : 'none'}}>{IdMsg} </div>
                            </div>
                        </div>
                        <div className="btn_submit_wrap" id="divBtnAuth">
                            <button type="submit" className="btn_submit" id="btnSend">로그인</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default RegisterPage