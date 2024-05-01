import React, {useEffect, useState} from 'react'; 
import { useDispatch } from 'react-redux'
import { getUser } from '../../../_actions/user_action' // action은 따로 모아두기

function BookListPage() {
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
      <div id="book-page">
        <section id="home-page-section-top">
            <div id="home-page-top">
                <div class="home-page-desc">
                    <h1 class="home-page-title"><span class="shadow">{Name}</span>의 나뭇잎에<br/>새긴 문장을 볼까요? &#127807;</h1>
                </div>
            </div>
        </section>
        <div className="book-page-list">
          
        </div>
        </div>
    </div>  
    
  ) 

}

export default BookListPage;
