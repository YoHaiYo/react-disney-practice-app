import React from 'react'
import styled from 'styled-components'

const Category = () => {
  return (
    <Container>
      <Wrap>
        <img src='/images/viewers-disney.png' alt='disney'/>
        <video autoPlay loop muted>
          <source src='/videos/disney.mp4' type='video/mp4'></source>
        </video>
      </Wrap>
      <Wrap>
        <img src='/images/viewers-marvel.png' alt='disney'/>
        <video autoPlay loop muted>
          <source src='/videos/marvel.mp4' type='video/mp4'></source>
        </video>
      </Wrap>
      <Wrap>
        <img src='/images/viewers-national.png' alt='disney'/>
        <video autoPlay loop muted>
          <source src='/videos/national-geographic.mp4' type='video/mp4'></source>
        </video>
      </Wrap>
      <Wrap>
        <img src='/images/viewers-pixar.png' alt='disney'/>
        <video autoPlay loop muted>
          <source src='/videos/pixar.mp4' type='video/mp4'></source>
        </video>
      </Wrap>
      <Wrap>
        <img src='/images/viewers-starwars.png' alt='disney'/>
        <video autoPlay loop muted>
          <source src='/videos/star-wars.mp4' type='video/mp4'></source>
        </video>
      </Wrap>
    </Container>
  )
}

export default Category

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0 26px;
  display: grid;
  /* gap: 25px;: 그리드 항목 사이의 간격을 25픽셀로 설정합니다. */
  gap: 25px;
  /* grid-template-columns: repeat(5, 1fr);: 그리드 템플릿 열이 5개의 동일한 너비 열을 갖도록 설정합니다. 각 열은 사용 가능한 공간의 1분의 1(1fr)을 차지합니다. */
  /* fr 단위는 반응형 레이아웃 만들때 유용함 */
  grid-template-columns: repeat(5, 1fr);
  /* @media (max-width: 768px) { ... }: 뷰포트 너비가 768 픽셀 이하일 때 스타일을 적용하는 미디어 쿼리입니다. 미디어 쿼리 내에서 grid-template-columns 속성은 작은 화면에 대해 1개의 동일한 너비 열(repeat(1, 1fr))을 갖도록 설정됩니다. */
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
              rgb(0 0 0 / 73%) 0px 16px 10px -10px ;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border: 3px solid rgba(249, 249, 249, 0.1 );
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
  }

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    opacity: 0;
    z-index: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
                rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249,249,249, 0.8);
    video {
      opacity: 1;
    }
  }

`;

