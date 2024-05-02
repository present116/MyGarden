import React, {useEffect, useState} from 'react'; 
import { useDispatch } from 'react-redux'
import { getUser } from '../../../_actions/user_action' 
import { getBookList } from '../../../_actions/book_action'
import TableSetting from './TableSetting'
import { Link } from "react-router-dom"



function BookListPage() {
  const dispatch = useDispatch();
  const [Name, setName] = useState("");
  

  useEffect(() => {
    return () => {
      getUserData()
    }
  }, [])

  const getUserData = async () => {
    await dispatch(getUser())
      .then(res=> {
        if (res.payload.success) {
            setName(res.payload.user.name);

            dispatch(getBookList({email: res.payload.user.email})) 
              .then(res => {
                if(res.payload.success === 'empty'){
                  
                }
              })
              
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
        <div>
          <button class="book-add"><Link to="/add">추가</Link></button>
        </div>
        <div className="book-page-list">
          {/* <TableSetting /> */}
        </div>
        </div>
    </div>  
    
  ) 

}

export default BookListPage;
