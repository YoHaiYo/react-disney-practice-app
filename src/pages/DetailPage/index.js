import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailPage = () => {
  let {movieId} = useParams();
  const [movie, setmovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/movie/${movieId}`
      )
      setmovie(response.data);
    }
    fetchData()
  }, [movieId])

  if(!movie) return null;

  // 강의 다듣고 재구성할떄 img 뿐만 아니라 다른 정보들도 가져오게 하기.
  return (
    <section>
      <img
        className='modal__poster-img'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="img"
      />
    </section>
  )
}

export default DetailPage