import React from 'react';
import axios from "axios";
import Movie from "./Movies";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  // async 이 함수가 비동기라고 말해줌. (끝날때 까지 기다려야 한다는 걸 서술해 주는 것.)
  getMovies = async () => {
    // await 를 이용해서 기다리길 원하는걸 지정해 줌.
    const {
      data: {
        data: {
          movies
        }
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by");
    this.setState({
      movies,
      isLoading: false
    });
  }
  componentDidMount() {
    // axio는 느릴 수 있어서, js에게 componentDidMount가 끝날 때 까지 기다려야 한다는 신호를 줘야함.
    // async, getMives 와 같은 함수를 만들어서 비동기적으로 처리
    this.getMovies();
  }
  render() {
    const {
      isLoading,
      movies,
    } = this.state;
    return (
    <section className="container">
      {isLoading ? (<div className="loader">
        <span className="loader__text">Loading...</span>
      </div>
      ): (
        <div className="movies">
          {movies.map(movie => (
            <Movie
              key = {movie.id}
              id = {movie.id}
              year = {movie.year}
              title = {movie.title}
              summary = {movie.summary}
              poster = {movie.medium_cover_image}
              genres = {movie.genres}
            />))}
        </div> 
      )} </section>);
  }
}

export default App;