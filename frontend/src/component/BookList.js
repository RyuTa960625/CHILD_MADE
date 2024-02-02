import { useState } from 'react';
import styles from './BookList.module.css'

const BookList = function(){

    const [isOpen, setIsOpen] = useState(false);

    const openModal = function(){
        setIsOpen(true);
    };

    const closeModal = function(){
        setIsOpen(false);
    }

    const 서버에서온데이터 = [
        {
            url: 'https://pj1.s3.ap-northeast-2.amazonaws.com/1706070905799_test_img.jpg',
            title: "해님과 달님"
        },
        {
            url: 'https://pj1.s3.ap-northeast-2.amazonaws.com/samplepng.png',
            title: "해님과 포세이돈님"
        },
        {
            url: 'https://pj1.s3.ap-northeast-2.amazonaws.com/1706070905799_test_img.jpg',
            title: "해님과 하기싫어님"
        },
        {
            url: 'https://pj1.s3.ap-northeast-2.amazonaws.com/1706070905799_test_img.jpg',
            title: "해님과 별님"
        },
        {
            url: 'https://pj1.s3.ap-northeast-2.amazonaws.com/samplepng.png',
            title: "해님과 발고도님"
        },
        {
            url: 'https://pj1.s3.ap-northeast-2.amazonaws.com/1706070905799_test_img.jpg',
            title: "해님과 해해자로 시작하는 말은님"
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

                <div>

                </div>

                <div className={styles.books_container} style={{marginTop : '4%'}}>
                    <div className={styles.search_container} style={{display : 'flex'}}>
                        <input className={styles.search}></input>
                        <div className={styles.find_container}>
                            <img src='/imgs/findM.png' alt='돋보기' className={styles.find}></img>
                        </div>
                    </div>
                    <div>
                        <img src='/imgs/bookShelfM.png' alt='책장' className={styles.bookShelf}></img>
                        <div className={styles.bookShelf_container}>
                            <div className={styles.btn_container}>
                                <img src='/imgs/pmbtnM.png' alt='왼쪽 페이지 이동' className={styles.left_btn}></img>
                                <img src='/imgs/pmbtn2M.png' alt='오른쪽 페이지 이동' className={styles.right_btn}></img>
                            </div>
                            {
                                서버에서온데이터.map((data, index)=>{
                                    return(
                                        <>
                                        <div className={styles.book_container}>
                                            <img className={styles.book_img}  src={data.url} alt='책 표지'/>      
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