import styled from "styled-components";

import PillInput from "./PillInput";
import IconButton from "./IconButton";
import LogoIcon from "../../image/logo_text.svg";
import { IoPeople, IoLayers } from "react-icons/io5";

function Header(props) {
    const showMenu = () => {

    };
    return (
        <Container backgroundColor={props.backgroundColor}>
            <Icon src={LogoIcon}/>
            {props.search && <Center><PillInput width="300px" placeholder="프로필을 검색합니다"/></Center>}
            <MenuLayout>
                {props.recommend && <IconButton icon={IoPeople}/>}
                {props.feed && <IconButton icon={IoLayers}/>}
                <Circle onClick={showMenu}/>
            </MenuLayout>
        </Container>
    );
}

export default Header;

const Container = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 30px;
    box-sizing: border-box;
    background-color: ${props => props.backgroundColor || "#3C3C3C"};
    z-index: 1;
`
const Icon = styled.img`
    height: 25px;
`
const Center = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`
const MenuLayout = styled.div`
    display: flex;
    flex-flow: row nowrap;
    gap: 30px;
`
const Circle = styled.div`
    width: 1.4rem;
    height: 1.4rem;
    background-color: white;
    border-radius: 50%;
`