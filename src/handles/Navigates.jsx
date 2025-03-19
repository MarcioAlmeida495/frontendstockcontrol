import { useNavigate } from "react-router-dom"

export const UseNavigate = ({url}) => {
    const navigate = useNavigate();
    navigate(url);
}