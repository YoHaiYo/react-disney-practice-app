import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => {

  const [show, setShow] = useState(false);
  // useLocation : react-router-dom 에서 가져온 패키지
  const { pathname } = useLocation();
  // searchValue : 검색어 기억 useState
  const [searchValue, setsearchValue] = useState("") ;
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if(window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  // console.log('useLacation.search',useLocation().search)

  const handleChange = (e) => {
    setsearchValue(e.target.value);
    // 검색어 치자마자 search 페이지로 이동됨
    navigate(`/search?q=${e.target.value}`)
  }
  
  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt='Disney Plus Logo'
          src='/images/logo.svg'
          onClick={() => (window.location.href = "/main")}
        />
      </Logo>

      {pathname === "/" ?
       (<Login>Login</Login>) : 
       <Input
        value={searchValue}
        onChange={handleChange}
        className='nav__input' 
        type='text' 
        placeholder='검색어를 입력하세요.'/>
      }
    </NavWrapper>
  )
}

export default Nav

const Login = styled.a`
  background-color: rgba(0,0,0,0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0,0,0, 0.582);
  border-radius: 5px;
  color: #fff;
  padding: 5px;
  border: none;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  /* 스크롤 되면 네비바 색 바꾸는 로직 */
  background-color: ${props => props.show ? "#090b13" : "trasparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`  
  padding:0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  cursor: pointer;

  img{
    display: block;
    width: 100%;
  }
`