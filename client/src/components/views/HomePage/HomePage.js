import React, {useEffect, useState} from 'react'; 
import { useDispatch } from 'react-redux'
import { getUser } from '../../../_actions/user_action' // action은 따로 모아두기

function HomePage() {
  const dispatch = useDispatch();
  const [Name, setName] = useState("");

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    await dispatch(getUser())
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
                  <h1 class="home-page-title"><span class="shadow">{Name}</span>의 정원<br/>에 오신걸 환영합니다 🤗</h1>
              </div>
              {/* <div class="home-page-image-top">
                  <img src="/images/logo.png" class="home-page-image-top"></img>
              </div> */}
          </div>
      </section>

    </div>  
    
  ) 

}

export default HomePage;
