# Front-End : Login 페이지


🔹 src > components 안에 있는 파일 위주로 보시면 됩니다.

기본 로그인 창은 LoginPage.jsx 이고, 나머지 Logo.jsx와 Login_btn.jsx는 컴포넌트, 그리고 MainPage.jsx, ViewPage.jsx 는 일단 페이지만 만들어 둔 거라 무시하셔도 될거같아요

🔹 처음 창 열면 메인페이지(MainPage.jsx)가 먼저 뜨는데 url 마지막에 /login 입력하시면 로그인 창으로 넘어갑니다!

🔹 백엔드 통신에 사용하는 axios는 LoginPage.jsx -> onSubmitLogin 안에 있습니다. 

+ID저장은 쿠키를 이용해서 구현했기 때문에,서버에 id하고 password만 보내면 될거 같아서 saveId는 일단 주석 처리 해뒀습니다. 혹시 필요하시면 주석 없애고 사용해주세요!

+Fake서버 사용해보느라 url자리에 https://reqres.in/api/login 이렇게 입력되어 있는데 이부분 지우고 하시면 될거같아요!

🔹변수명 설명

- id: 사용자가 입력한 id (->이메일 형식 으로 입력해야 합니다!)
- password: 사용자가 입력한 비밀번호
- saveId : 사용자가 'ID 저장' 체크박스 선택 유무 (선택:true / 해제: false)
