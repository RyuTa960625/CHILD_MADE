import { useEffect, useState } from 'react';
import styles from './BookList.module.css'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const BookList = function(){

    const location = useLocation();
    const navigate = useNavigate();
    const playMode = location.state ? location.state.playMode : null;
    const [bookId, setBookId] = useState(1);

    useEffect(() => {
        loadBookList();
        loadBookInfo();
        console.log(playMode)
        if(!playMode){
            navigate('/error')
        }
    }, [bookId])
    // step1. "npm install axios" 를 터미널에 입력한다. v
    // step2. import axios from 'axios' 를 통해 임포트한다. v
    // step3. 요청하고자 하는 api 메서드에 따라 get, post, put, delete
    // ex) axios.get('접속하고자 하는 url').then(response=>{성공했을 떄 로직}).catch(error=>{실패했을 떄 로직})

    //http://localhost:8080/api/books/?page=1&size=6
    const [isOpen, setIsOpen] = useState(false);
    const [bookList, setBookList] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [bookInfo, setBookInfo] = useState([]);

    const openModal = function(){
        setIsOpen(!isOpen);
    };

    const apiTest = function(){
        axios.get(`http://localhost:8080/api/books/?page=${pageNum}&size=6`)
        .then(response=>{
            console.log(response.data)
        })
    }

    const apiTest2 = function(){
        axios.get(`http://localhost:8080/api/books/${bookId}/roles`)
        .then(response=>{
            console.log(response.data);
        })
    }

    const loadBookList = function(){
        axios.get(`http://localhost:8080/api/books/?page=${pageNum}&size=6`)
        .then(response=>{
            setBookList(response.data.data.content)
            setTotalPage(response.data.data.totalPages);
        })
    }

    const loadBookInfo = function(){
        axios.get(`http://localhost:8080/api/books/${bookId}/roles`)
        .then(response=>{
            setBookInfo(response.data.data);
        })
    }

    const printBookId = function(){
        console.log(bookId)
    }

    const moveNextPage = function(){
        // totalPage - 1을 한 이유: 아싸리 페이지가 0부터 시작함(db의 인덱스 값을 그대로 넘기기 때문)
        if(pageNum < totalPage-1){
            console.log(pageNum)
            // 원하는 페이지 번호로 변경하고
            setPageNum(pageNum + 1);
            axios.get(`http://localhost:8080/api/books/?page=${pageNum + 1}&size=6`)
            .then(res => setBookList(res.data.data.content));
        }
    }

    const movePrevPage = function(){
        if(pageNum > 0){
            console.log(pageNum)
            setPageNum(pageNum - 1);
            axios.get(`http://localhost:8080/api/books/?page=${pageNum - 1}&size=6`)
            .then(res => setBookList(res.data.data.content));
        }
    }

    const 서버에서온데이터 = [
        {
            imageUrl: 'https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/1.png',
            title: "해님과 달님",
            story: "해님과 달님, 그 두 개의 존재는 어둠과 빛, 미지의 영역과 밝히기 어려운 비밀을 지닌다. 해님은 뜨거운 불길과 함께 땅을 불태우며, 끝없이 번뜩이는 불빛으로 모든 것을 드러내는 존재다. 그러나 그 불꽃 속에는 타오르는 고통과 끝없는 욕망이 감춰져 있다. 한편 달님은 어둠 속에서 나타나는 정적이고 차가운 빛이다. 그 눈에 비치는 빛은 불안과 심연의 신비로움을 안고 있다. 달님은 끊임없이 변하는 얼굴을 갖고 있어서 때로는 숨겨진 고요와 휴식, 때로는 어둠의 깊은 비밀을 드러내는 존재이다. 해님과 달님, 양립하는 두 세계의 존재는 우리에게 숨겨진 현실의 양면을 상징한다. 그들의 존재는 무서움과 경외, 놀라움과 감동을 동시에 안겨준다. 이 두 날개를 가진 존재들은 우리가 알지 못하는 세계의 문을 열어주며, 우리에게 새로운 이야기를 간직하고 있다.",   
            ch1: 'https://pj1.s3.ap-northeast-2.amazonaws.com/samplepng.png',
            ch2: 'https://pj1.s3.ap-northeast-2.amazonaws.com/samplepng.png',
            ch3: 'https://pj1.s3.ap-northeast-2.amazonaws.com/samplepng.png',
            ch4: 'https://pj1.s3.ap-northeast-2.amazonaws.com/samplepng.png',
            role1: '해',
            role2: '달',
            role3: '호랑이',
            role4: '옥상황제'
        
        },
    ]

    return(
           <>
        <div>
            <div className={styles.main_container}>
                <img src='/imgs/cloud.png' alt='구름1' className={styles.c1 + ' ' + styles.clouds}/>
                <img src='/imgs/cloud.png' alt='구름2' className={styles.c2 + ' ' + styles.clouds}/>
                <img src='/imgs/cloud.png' alt='구름3' className={styles.c3 + ' ' + styles.clouds}/>
                <img src='/imgs/cloud.png' alt='구름4' className={styles.c4 + ' ' + styles.clouds}/>
                <img src='/imgs/cloud.png' alt='구름5' className={styles.c5 + ' ' + styles.clouds}/>
                <img src='/imgs/cloud.png' alt='구름6' className={styles.c6 + ' ' + styles.clouds}/>
                <img src='/imgs/cloud.png' alt='구름7' className={styles.c7 + ' ' + styles.clouds}/>
                <img src='/imgs/cloud.png' alt='구름8' className={styles.c8 + ' ' + styles.clouds}/>
                <img src='/imgs/cloud.png' alt='구름9' className={styles.c9 + ' ' + styles.clouds}/>
                <img src='/imgs/cloud.png' alt='구름10' className={styles.c10 + ' ' + styles.clouds}/>
                <img src='/imgs/cloud.png' alt='구름11' className={styles.c11 + ' ' + styles.clouds}/>
                <img src='/imgs/cloud.png' alt='구름12' className={styles.c12 + ' ' + styles.clouds}/>
                <img src='/imgs/cloud.png' alt='구름13' className={styles.c13 + ' ' + styles.clouds}/>
                <img src='/imgs/cloud.png' alt='구름14' className={styles.c14 + ' ' + styles.clouds}/>

                {
                    isOpen && <> <div className={styles.modal_background}></div>
                    <div className={styles.book_info_container}>
                        <div>
                            <img src='/imgs/exitIcon.png' alt='탈출' className={styles.close_icon}  onClick={openModal}></img>
                        </div>
                        <div className={styles.book_info_img_container}>
                            <img className={styles.book_info_bigimg} src={bookInfo.bookImageUrl} alt='책 표지'></img>
                            <img className={styles.book_info_img} src={bookInfo.bookImageUrl} alt='책 표지'></img>
                            <h1 className={styles.book_info_title}>{bookInfo.title}</h1>
                        </div>
                        <hr style={{marginTop : 130}}></hr>
                        <div className={styles.choose_container}>
                            <div className={styles.story_container}>
                                <h1 style={{marginLeft : '-82%'}}>줄거리</h1>
                                <p className={styles.story_info}>{bookInfo.summary}</p>
                            </div>
                            <div className={styles.character_choose_container}>
                                <h1 style={{marginTop : '1.5%', marginLeft : '-78%'}}>역할선택</h1>
                                {/* {
                                    bookInfo.map((data, index)=>{
                                        return(
                                            <>
                                                <div className={styles.character_container}>
                                                    <div className={styles.role_container}>
                                                        <div className={styles.character_btn1}>
                                                            <img className={styles.character_btn_img} src={data.roleListDtoList[index].imageUrl} alt='역할1'></img>
                                                        </div>
                                                        <h2 style={{marginTop : 15}}>{data.roleListDtoList[index].roleName}</h2>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                } */}
                               
                                <div className={styles.character_container}>
                                    <div className={styles.role_container}>
                                        <div className={styles.character_btn1}>
                                            <img className={styles.character_btn_img} src={bookInfo.roleListDtoList[0].imageUrl} alt='역할1'></img>
                                        </div>
                                        <h2 style={{marginTop : 15}}>{bookInfo.roleListDtoList[0].roleName}</h2>
                                    </div>
                                    <div className={styles.role_container}>
                                        <div className={styles.character_btn2}>
                                            <img className={styles.character_btn_img} src={서버에서온데이터[0].ch2} alt='역할2'></img>
                                        </div>
                                        <h2 style={{marginTop : 15}}>{서버에서온데이터[0].role2}</h2>
                                    </div>
                                    <div className={styles.role_container}> 
                                        <div className={styles.character_btn3}>
                                            <img className={styles.character_btn_img} src={서버에서온데이터[0].ch3} alt='역할3'></img>
                                        </div>
                                        <h2 style={{marginTop : 15}}>{서버에서온데이터[0].role3}</h2>
                                    </div>
                                    <div className={styles.role_container}> 
                                        <div className={styles.character_btn4}>
                                            <img className={styles.character_btn_img} src={서버에서온데이터[0].ch4} alt='역할4'></img>
                                        </div>
                                        <h2 style={{marginTop : 15}}>{서버에서온데이터[0].role4}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.start_btn}>
                                <h1 className={styles.start_text}>시작하기</h1>
                            </div>
                        </div>
                    </div>
                    </>
                }
                

                <div className={styles.books_container} style={{marginTop : '4%'}}>
                    <div className={styles.search_container} style={{display : 'flex'}}>
                        <input className={styles.search}></input>
                        <div className={styles.find_container}>
                            <img src='/imgs/findM.png' alt='돋보기' className={styles.find}></img>
                        </div>
                    </div>
                    <div>
                        <img src='/imgs/bookShelfM.png' alt='책장' className={styles.bookShelf}></img>
                        <div className={styles.bookShelf_container} >
                            <div className={styles.btn_container}>
                                <img src='/imgs/pmbtnM.png' alt='왼쪽 페이지 이동' className={styles.left_btn} onClick={movePrevPage}></img>
                                <img src='/imgs/pmbtn2M.png' alt='오른쪽 페이지 이동' className={styles.right_btn} onClick={moveNextPage}></img>
                            </div>
                            {
                                bookList.map((data, index)=>{
                                    return(
                                        <>
                                        <div className={styles.book_container} onClick={()=>{openModal(); apiTest(); apiTest2(); setBookId(data.id); printBookId();}}>
                                            <img className={styles.book_img}  src={bookList[index].imageUrl} alt='책 표지'/>      
                                            <div className={styles.book_text_box}>
                                                <h1 className={styles.book_text}>{data.title.length > 8 ? `${data.title.slice(0,7)}...`: data.title}</h1>
                                            </div>
                                        </div>
                                        </>
                                    )
                                })
                            }
                            <div className={styles.character1}>
                                <img src='/imgs/ch1ff.gif' alt='대표캐릭터1기본' width={340}/>
                            </div>
                            <div className={styles.character2}>
                                <img src='/imgs/ch2ff.gif' alt='대표캐릭터2기본' width={500}/>
                            </div>

                            
                        </div>
                    </div>
                    <div className={styles.wing_container}>
                        <div className={styles.wm} style={{width : 330, height : 150, marginLeft : -133, position : 'absolute'}}>
                            <img src='/imgs/wLM.png' alt='왼쪽 날개' className={styles.wing1}></img>
                        </div>
                        <div className={styles.wm2} style={{width : 330, height : 150, marginLeft :803, position : 'absolute'}}>
                            <img src='/imgs/wRM.png' alt='오른쪽 날개' className={styles.wing2}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </> 
    )
};

export default BookList;