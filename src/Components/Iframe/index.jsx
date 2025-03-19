import { Stylediframe } from "../../Styles/styledIframe"

export const Iframe = ({show}) => {
    return <>
        {show && <Stylediframe src="http://localhost/diario"/>}
    </>
}