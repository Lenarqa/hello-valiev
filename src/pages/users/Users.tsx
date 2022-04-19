import React, {useState, useEffect} from 'react';
import EmptyScreen from '../../components/UI/emtyScreen/EmptyScreen';
import style from "./Users.module.css";

const Users:React.FC = () => {
    const [isEmptyPage, setIsEmptyPage] = useState<boolean>(true);
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setIsEmptyPage(false);
    //     }, 1500);
    // }, []);

    return <div className={style.container}>
        {isEmptyPage ? <EmptyScreen /> : <div>Hello users</div>}
    </div>
}
export default Users;