import React from 'react';


function MainPage() {
    
    return (
      <div>
        
        <section id="home-main-section-top">
            <div id="home-main-top">
                <div class="home-main-desc">
                    <h1 class="home-main-title">독서의 정원에 오신 것을 <br/>환영합니다</h1>
                    <p class="service-desc">
                        독서 기록을 사람들과 공유 하세요
                    </p>
                    <div id="login-buttons">
                        <a href="/login" class="login-button">
                            <div class="login-text">로그인</div>
                        </a>
                        <a href="/register" class="login-button">
                            <div class="login-text">회원가입</div>
                        </a>
                    </div>
                </div>
                {/* <div class="home-main-image-top">
                    <img src="/images/logo.png" class="home-main-image-top"></img>
                </div> */}
            </div>
        </section>

      </div>  
        
    ) 

}

export default MainPage;
