import imgg from './components/images/img.png';

const postList = [
    {
      "no": 1,
      "image" : {imgg}, 
      "title": "빔프로젝터 빌려드립니다",
      "content": "내용",
      "date": "16:20",
      "price" : "30,000"
    },
    {
      "no": 2,
      "image" : '{imgg}', 
      "title": "제목",
      "content": "내용",
      "date": "날짜/시간",
      "price" : "가격"
    },
    {
      "no": 3,
      "image" : "{imgg}", 
      "title": "제목",
      "content": "내용",
      "date": "날짜/시간",
      "price" : "가격"
    },
    {
      "no": 4,
      "image" : './components/images/img.png', 
      "title": "제목",
      "content": "내용",
      "date": "날짜/시간",
      "price" : "가격"
    },
    {
      "no": 5,
      "image" : "./components/images/img.png", 
      "title": "제목",
      "content": "내용",
      "date": "날짜/시간",
      "price" : "가격"
    },
  ];
  
  const getPostByNo = no => {
    const array = postList.filter(x => x.no == no);
    if (array.length == 1) {
      return array[0];
    }
    return null;
  }
  
  export {
    postList,
    getPostByNo
  };