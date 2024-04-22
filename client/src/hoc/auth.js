import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'
import { useNavigate } from 'react-router-dom'

export default function(SpecificComponent, option, adminRoute = null) {

    // option == null -> 아무나 출입이 가능한 페이지
    // true -> 로그인한 유저만 출입이 가능한 페이지
    // false -> 로그인한 유저는 출입 불가능한 페이지


    function AuthenticationCheck() {
        
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(()=> {
            dispatch(auth())
                .then(res=>{
                    // 로그인하지 않은 상태
                    if(!res.payload.isAuth) {
                        if(option) {
                            navigate("/login")
                        }
                    } else{
                        // 로그인한 상태
                        if(adminRoute && !res.payload.isAdmin) { // 어드민이 아닌 유저
                            navigate("/")
                        }else{
                            if(!option) { // 로그인유저이지만 출입 불가 페이지
                                navigate("/")
                            }
                        }
                    }
                })
        }, [])
        return (
            <SpecificComponent></SpecificComponent>
        )
    }
    return <AuthenticationCheck />
}