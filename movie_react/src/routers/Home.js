import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Movie from "../components/Movie";
import Side from "../components/Side";
import Spinner from "../components/Spinner";
import "./Home.css";
function Container({ children }) {
  return <section className="container">{children}</section>;
}

function MovieLoad() {
  // state Hook 관리
  const [isLoading, setLoad] = useState(true); // 로딩 시점
  const [moviesItem, setMovies] = useState([]); // 영화 업데이트

  // Mount, Update Hook 관리
  useEffect(() => {
    // useEffect 사용시 인자가 없으면 dom이 변화할때마다 무조건적으로 해당 useEffect를 실행한다.
    // 이는 axios 같이 API data를 받아올때 끝없이 받아오게 되기 때문에 매우 낭비이다.
    // 하지만 useEffect의 두번째 인자로  [] 를 넣으면 첫 렌더시 한번만 실행하고 스테이트가 변하더라도 useEffect를 실행하지 않는다.
    // 즉 변화가 일어날때만 실행함 , 함수실행을 무조건적으로 하지않음

    // ComponentDidMount + ComponentDidUpdate 렌더 후 로딩 시점 변경
    // async await 로 axios가 해당 url 접근이 끝날때까지기다린다.
    const getMovies = async () => {
      const {
        data: {
          data: { movies },
        },
      } = await axios.get(
        "https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating"
      );
      setMovies(movies);
      setLoad(false);
    };
    getMovies();
  }, []);

  return isLoading ? (
    <div className="loader">
      <Spinner />
    </div>
  ) : (
    <div className="inner">
      <Header />
      <div className="inner__wrap">
        <Side />
        <div className="movies">
          <h2 className="movies__title">신작 영화</h2>
          {moviesItem.map((movie) => {
            return (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
                rating={movie.rating}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Container>
        <MovieLoad />
      </Container>
    </div>
  );
}

export default App;

// life cycle
// Mount : 컴포넌트가 실행될때 defaultProps 와 state를 저장
//
