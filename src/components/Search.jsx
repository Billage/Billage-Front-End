import React, { Component } from 'react';
import styled from "styled-components";
import search_img from '../components/images/search.png'
import search_img2 from '../components/images/search2.png'
let imgstyle = {
    width: "20px",
    height: "20px"
 }

let input = {
  width: "96%",
  border: "none"
}

class Search extends Component {
    render() {
      return (
      // <table className="searchTable">
      //   <tr>
      //     <th className="searchTh">
      //       <form>
      //         <input type="text" placeholder='검색어를 입력하세요' style={input}/>
      //       </form>
      //     </th>
      //     <td className="searchTd">
      //       <a href = "/list"><img src={search_img} alt="search" style={imgstyle}></img></a>
      //     </td>
      //   </tr>
      // </table>
        
        <div>
            <a href="/list"><img class="search_img" src={search_img2} alt="search"></img></a>
        </div>

      );
    }
  }

  export default Search;