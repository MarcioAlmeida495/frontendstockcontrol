import { useState } from 'react'
import { StyledLeftMenu } from '../../Styles/styledLeftMenu'
import { StyledLink } from '../../Styles/styledLink';


export const LeftMenu = ({children}) => {
    const [show, setShow] = useState(false);

    return <>
        <StyledLeftMenu id='leftMenu' 
            onMouseEnter={()=>{
                setShow(true);
            }}
            onMouseLeave={()=>{
                setShow(false);
            }}
        >
            {show && <>
                <StyledLink to={'/conf'}>
                    <h3>CONFIGURAÇÕES</h3>
                </StyledLink>
                {children} 
               
            </>
            }
        </StyledLeftMenu>
    </>

}