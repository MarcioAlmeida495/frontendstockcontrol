import { useState } from 'react'
import { squareSize, StyledLeftMenu } from '../../Styles/styledLeftMenu'
import { StyledLink } from '../../Styles/styledLink';
import { MenuButton } from '../MenuButton';


export const LeftMenu = ({children}) => {
    const [show, setShow] = useState(false);

    return <>
        <StyledLeftMenu id='leftMenu' 
            className={show ? 'active' : ''}
            
        >
            
            <MenuButton onClick={()=>{setShow(!show)}}/> 
            {children} 

        </StyledLeftMenu>
    </>

}