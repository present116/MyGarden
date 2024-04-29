import React, {useEffect, useState} from 'react'; 
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../../_actions/user_action' // action은 따로 모아두기

function HomePage(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  
  useEffect(() => {
    if (props.user && props.user.userData && props.user.userData.email) {
      getUserData()
    }
  }, [props.user])

  const getUserData = async () => {
    
    await dispatch(getUser({ email: props.user.userData.email }))
      .then(res=> {
        if (res.payload.success) {
            setName(res.payload.user.name);
          }
      })
  }


  return (
    <div>
      
      <section id="home-page-section-top">
          <div id="home-page-top">
              <div class="home-page-desc">
                  <h1 class="home-page-title">{name}의 정원<br/>에 오신걸 환영합니다 🤗</h1>
              </div>
              <div class="home-page-image-top">
                  <img src="/images/logo.png" class="home-page-image-top"></img>
              </div>
          </div>
      </section>

    </div>  
    
  ) 

}

export default HomePage;
