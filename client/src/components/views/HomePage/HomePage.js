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
      <div id="home-page">
        <section id="home-page-section-top">
            <div id="home-page-top">
                <div class="home-page-desc">
                    <h1 class="home-page-title"><span class="shadow">{Name}</span>의 정원<br/>에 오신걸 환영합니다 &#128075;</h1>
                </div>
            </div>
        </section>
        <div class="home-plant-area">
            <img src="/images/lv1.png" class="home-page-image"></img>
        </div>
        <div id="header" role="banner"> 
          <div id="shortcutArea" class="shortcut_area" aria-label="주요 서비스">
            <ul class="shortcut_list">
              <li class="shortcut_item">
                  <span class="service_name"><a href="/book/list">나의 식물</a></span>
              </li>
              <li class="shortcut_item">
                <span class="service_name">탐색</span>
              </li>
              <li class="shortcut_item">
                <span class="service_name">북워크</span>
              </li>
              <li class="shortcut_item">
                <span class="service_name">설정</span>
              </li>
            </ul>
          </div>
          </div>
        </div>
    </div>  
    
  ) 

}

export default HomePage;
