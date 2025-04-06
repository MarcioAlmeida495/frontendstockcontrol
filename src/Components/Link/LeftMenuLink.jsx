import { useState } from "react";
import { StyledLink } from "../../Styles/styledLink";
import { useLocation } from "react-router-dom";

export const Links = ({ links = {} }) => {
    const keys = Object.keys(links);
    const linkTos = Object.values(links);
    const [activeIndex, setActiveIndex] = useState(null);
    const location = useLocation();

    return (
        <>
            
            {keys.map((each, index) => (
                <StyledLink
                    key={index}
                    to={linkTos[index]}
                    onClick={() => setActiveIndex(index)}
                    className={`${(activeIndex === index) ? "active" :  (location.pathname === linkTos[index] ? 'active' : 'lowopacity')}`}
                >
                    <h3>{each}</h3>
                </StyledLink>
            ))}
        </>
    );
};
