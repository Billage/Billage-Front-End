//빌려줄게요
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Header from "./Header";
import Search from "./Search"
import { Link } from 'react-router-dom';
import { postList } from '../Data';

const PostList = props => {
  const [ dataList, setDataList ] = useState([]);

  useEffect(() => {
    setDataList(postList);
  }, [ ])

  const Date = styled.div`
  text-align:right;
  color: gray;
  `;

  const Price = styled.div`
  text-align:right;
  color: #A352CC;
  `;
  const Title = styled.div`
    text-align:left;
    color: black;
    font-weight:bold;
    font-size:16px;
    `;

  let style = {
    width:"1000px"
 
  }

  return (
    <>
    <Header></Header>
    <Search></Search>
        {
          dataList ? dataList.map((item, index) => {
            return (
                <table className="ListTable">
                    <tr className="ListTr">
                        <td className="ListTd" rowSpan="2"><img src={item.image}></img></td>
                        <td className="ListTd" style={style}><Link to={`/ViewPage/${item.no}`}><Title>{ item.title }</Title></Link></td>
                        <td className="ListTd"><Date>{ item.date }</Date></td>
                    </tr>
                    <tr className="ListTr">
                        <td className="ListTd"> </td>
                        <td className="ListTd"> <Price>{ item.price }</Price> </td>
                    </tr>
                </table>
                
            )
          }) : ''
        }
     
    </>
  )
}

export default PostList;