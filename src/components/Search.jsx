import React, { Component } from 'react';
import styled from "styled-components";
import search_img from '../components/images/search.png'

class Search extends Component {
    render() {
      return (
      
        <div>
            <a href="/list"><img class="search_img" src={search_img} alt="search"></img></a>
        </div>

      );
    }
  }

  export default Search;