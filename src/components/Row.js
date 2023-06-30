// Row.js

import axios from '../api/axios'
import React, { useCallback, useEffect, useState } from 'react'
import './Row.css'
import MovieModal from './MovieModal'

// A11y : 이거 숫자 1임;
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide} from 'swiper/react';

// import swiper style
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/scrollbar"
import "swiper/css/pagination"
import styled from 'styled-components'

const Row = ({title, id, fetchUrl}) => {
  const [movies, setMovies] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelection ] = useState({})

  const fetchMoviesData = useCallback( async () => {
    const response = await axios.get(fetchUrl);
    console.log('response', response);
    setMovies(response.data.results);
  },[fetchUrl])

  useEffect(() => {
    fetchMoviesData();
  }, [fetchMoviesData])

  const handleClick = (movie) => {
    setModalOpen(true)
    setMovieSelection(movie)
  }

  return (
    <Container>
      <h2>{title}</h2>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]} // A11y : 이거 숫자 1임;
          loop={true} // 맨끝 목록에서 첫목록 루프 사용여부
          navigation // arrow 버튼 사용 유무
          pagination={{ clickable: true}} // 몇번쨰 목록인지 보여주는 하얀 점 보이게 할지
          breakpoints={{
            1378: { // 1378px 이상일때
              slidesPerView: 6, // 한번에 보이는 슬라이드 개수
              slidesPerGroup: 6,
            },
            998: { // 1378px ~ 998px 일때
              slidesPerView: 5, // 한번에 보이는 슬라이드 개수
              slidesPerGroup: 5,
            },
            625: { // 998px ~ 625px 일때
              slidesPerView: 4, // 한번에 보이는 슬라이드 개수
              slidesPerGroup: 4,
            },
            0: { // 625px ~ 0px 일때
              slidesPerView: 3, // 한번에 보이는 슬라이드 개수
              slidesPerGroup: 3,
            },
          }}
        >
          <Content id={id}>
            {movies.map(movie => (
              <SwiperSlide>
                <Wrap>
                  <img 
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.name}
                    onClick={() => handleClick(movie)}
                  />
                </Wrap>
              </SwiperSlide>
              ))}
          </Content>
        </Swiper>
        {modalOpen && 
          <MovieModal
            {...movieSelected}
            setModalOpen={setModalOpen}
          />
        }
    </Container>
  )
}

export default Row

const Container = styled.div`
  padding: 0 0 26px;

`;

const Content = styled.div`

`;

const Wrap = styled.div`
  width: 95%;
  height: 95%;
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 /69%) 0px 26px 30px -10px,
              rgb(0 0 0 /73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    width: 100%;
    transition: opacitiy 500ms ease-in-out;
    z-index: 1;
  }
  &:hover {
    /* 그림자 레이어 2개를 정의. 겹쳐보이는 효과. px은 순서대로 수평 오프셋, 세로 오프셋, 그림자 흐림반경, 확산반경 */
    box-shadow: rgb(0 0 0 /80%) 0px 40px 58px -16px,
                rgb(0 0 0 /72%) 0px 30px 22px -10px;
    transform: scale(0.98);
    border-color: rgba(249,249,249,0.8);
  }
`;