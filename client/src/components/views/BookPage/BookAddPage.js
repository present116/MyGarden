import React, {useEffect, useState} from 'react'; 
import { useDispatch } from 'react-redux'
import { getUser } from '../../../_actions/user_action' 
import { onSearchBtn } from '../../../_actions/book_action'
import TableSetting from './TableSetting'

function BookAddPage() {
    const dispatch = useDispatch();
    const [Name, setName] = useState("");
    const [Search, setSearch] = useState("")
    const [Table, setTable] = useState("");
    
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
            }
        })
    }

    function onSearchEvent(e) {
        setSearch(e.currentTarget.value)
    }

    function onSearchBtnEvent() {
        onSearchBtn(Search)
            .then(res => {
                setTable(res.payload);
            })
    }
    
    
    return (
        <div>
            <div id="book-page">
                <section id="home-page-section-top">
                    <div id="home-page-top">
                        <div class="home-page-desc">
                            <h1 class="home-page-title"><span class="shadow">{Name}</span>님<br/>나뭇잎에 책을 등록해 보세요 &#128082;</h1>
                        </div>
                    </div>
                </section>
            </div>
            <div class="search-head">
                <div class="search-box">
                    <div class="search-btn">
                        <input type="text" class="search-left" placeholder='찾으시는 도서명 또는 저자를 입력해 주세요.' value={Search} onChange={onSearchEvent}/>
                    </div>
                    <button class="search-right" onClick={onSearchBtnEvent}>
                        <div class="search-right-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style={{"pointer-event": 'none', display: 'inherit', width: '100%', height: '100%'}}><path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path></svg>
                        </div>
                    </button>
                </div>
            </div>
            <TableSetting json={Table} />

        </div>
        
    )
}

export default BookAddPage;