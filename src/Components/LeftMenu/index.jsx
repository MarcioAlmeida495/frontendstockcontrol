import { useEffect, useState } from 'react'
import { squareSize, StyledLeftMenu } from '../../Styles/styledLeftMenu'
import { StyledLink } from '../../Styles/styledLink';
import { MenuButton } from '../MenuButton';


export const LeftMenu = ({children}) => {
    const [show, setShow] = useState(false);
    const [clicked, setClicked] = useState(false);
 
    useEffect(()=>{
        if(clicked)setShow(true);
        
    },[clicked])

    return <>
        <StyledLeftMenu id='leftMenu' 
            onMouseLeave={()=>{if(!clicked)setShow(false)}} className={show ? 'active' : ''}
            
        > 
            
            <MenuButton onMouseEnter={()=>setShow(true)} clicked={clicked} onClick={()=>{setClicked(!clicked);}}/> 
            {children} 

        </StyledLeftMenu>
    </>

}