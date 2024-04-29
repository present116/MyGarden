import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'
import { useNavigate } from 'react-router-dom'


export default function (SpecificComponent, option, adminRoute = null) {
    
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(()=> {
            dispatch(auth())
                .then(res=>{
                    // 로그인하지 않은 상태
                    if(!res.payload.isAuth) {
                        if(!option) {
                            navigate("/login")
                        }
                    } else{
                        if(adminRoute === 'login') {
                            navigate("/home")
                        }
                        // 로그인한 상태
                        else if(adminRoute && !res.payload.isAdmin) { // 어드민이 아닌 유저
                            navigate("/")
                        }else{
                            if(option) { // 로그인유저이지만 출입 불가 페이지
                                navigate("/")
                            }
                        }
                    }
                })
        }, [])
        return (<SpecificComponent {...props} user={user}/>)
    }

    return <AuthenticationCheck />
}