// import axios from 'axios'
import React, {useEffect, useState} from 'react'
import axios from '../api/axios'
import requests from '../api/request'
import "./Banner.css"
import styled from 'styled-components'

const Banner = () => {

  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기(여러 영화) 
    // 다음 url를 줄일것 일뿐. https://api.themoviedb.org.w3/movie/now_playing
    const response = await axios.get(requests.fetchNowPlaying);
    // console.log(response)

    // 여러 영화 중 영화 하나의 ID를 랜덤으로 가져오기 
    const movieId = response.data.results[
      // console찍으면 data-results에 20개의 영화정보를 볼 수 있다.
      // Math.floor : 반내림
      // Math.random() : 0~1 실수 리턴.
      // Math.floor(Math.random() ~ : 0 ~ 20 리턴
      Math.floor(Math.random() * response.data.results.length) 
    ].id
    // console.log(Math.floor(Math.random() * response.data.results.length) )

    // 특정 영화의 더 자세한 정보 가져오기 
    const {data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos"}
    })

    setMovie(movieDetail);
  }

  // 영화설명 n번째 글자이후 자르기
  const truncate = (str, n) => {
    // 삼항연산자. ?를 if로 생각하면 편함. if안에 if있는 구문.
    // 글자수가 n보다 크면 자르는 로직 작동. 아니면 그대로 출력.
    return str?.length > n ? str.substring(0,n) + "..." : str;
  }

  if(isClicked) {
    return(
      <> 
      <Container>
        <HomeContainer>
          <button className="CancleButton" onClick={() =>setIsClicked(false)}>
            닫기 X
          </button>
          <Iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=0&playlist=${movie.videos.results[0].key}`}
            width="640"
            height="360"
            frameborder="0"
            allow="autoplay; fullscreen"
          ></Iframe>
        </HomeContainer>
      </Container>
        
      </>
    )
  } else {
    return (
      <header
          className='banner'
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            backgroundPosition: "top center",
            backgroundSize: "cover"
          }}
        >
          <div className='banner_contents'>
            <h1 className='banner_title'>
              {movie.title || movie.name || movie.original_name}
            </h1>
            <div className='banner__buttons'>
              {movie?.videos?.results[0]?.key &&
              <button 
                className='banner__button play'
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>}
            </div>
            <p className='banner__description'>
              {truncate(movie.overview, 100)}
            </p>
          </div>
            <div className='banner--fadeBottom'/>
        </header>
    )
  }
}

export default Banner

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

