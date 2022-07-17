import * as React from 'react'
import { Autocomplete,  AutocompleteChangeDetails,   AutocompleteChangeReason,  FormControl, FormHelperText, Input, InputLabel, TextField } from '@mui/material';
import { atom, useRecoilState } from 'recoil';
import useDebounce from '../hooks/useDebounce';
import axios, { AxiosResponse } from 'axios';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';


type Inputs = {
  example: string,
  exampleRequired: string,
};

const movieTitle = atom({
  key: "movieTitle",
  default: ""
})
const suggestedMovies = atom({
  key: "suggestedMovies",
  default: []
})

const selectedMovieAtom = atom({
  key: "selectedMovie",
  default: null as IMovie | null
})

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ISearchMovieResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

function NewReview() {
  const [movie, setMovie] = useRecoilState(movieTitle);
  const [movies, setMovies] = useRecoilState(suggestedMovies);
  const [selectedMovie, setSelectedMovie] = useRecoilState(selectedMovieAtom);
  const debouncedMovieTitle = useDebounce<string>(movie, 500);

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMovie(event.target.value);
  }

  React.useEffect(() => {
    const fetchMovieSuggestions = async() => {
      if (!debouncedMovieTitle) { 
        setMovies([]);
        return; 
      }
      const apiUrl = `${process.env.REACT_APP_API_URL}/searchMovie?searchQuery=${debouncedMovieTitle}` as string;
      const { data } : AxiosResponse = await axios.get(apiUrl);
      console.log("🚀 ~ file: NewReview.tsx ~ line 29 ~ fetchMovieSuggestions ~ data", data);
      const moviesLocal = data.results.map(({title, id, release_date} : IMovie) => ({title, id, release_date: release_date.split('-')[0]}));
      console.log("🚀 ~ file: NewReview.tsx ~ line 37 ~ fetchMovieSuggestions ~ moviesLocal", moviesLocal)
      setMovies(moviesLocal);
    }
    fetchMovieSuggestions();
  }, [debouncedMovieTitle, setMovies])

  const onAutocompleteChange = (event: React.SyntheticEvent<Element, Event>, value: IMovie | null, reason: AutocompleteChangeReason, details?: any) => {
    if (!value) { setMovies([]); return; }
    setSelectedMovie(value);
  }
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={movies}
      sx={{ width: 300 }}
      value={selectedMovie}
      onChange={onAutocompleteChange}
      getOptionLabel={(option: IMovie) => `${option.title} ${option.release_date}` || ""}
      renderInput={(params: any) => <TextField {...params} id="standard-basic" label="Movie name" variant="standard" value={movie} onChange={onTextFieldChange}/>}
    />
  )
}

export default NewReview