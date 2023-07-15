# Micro-Weather-Standalone

Micro-Weather-Standalone은 Micro-Weather (https://github.com/tombeom/Micro-Weather) 의 독립 실행형 버전(구버전)으로 

별도의 서버 없이 작동할 수 있는 크롬 확장 프로그램입니다.

각종 API를 사용해 브라우저에서 팝업 형식으로 손쉽게 날씨, 미세먼지 정보 등을 확인할 수 있습니다.

### 사용 기술

<div>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
<div>

## 사용법 및 안내사항

### 사용법
> **가급적 Micro-Weather (https://github.com/tombeom/Micro-Weather) 를 사용하는 것을 권장합니다.**

1. ```git clone https://github.com/tombeom/Micro-Weather-Standalone.git .```   
명령어를 사용하거나 ```Download Zip```을 이용해 repository 전체 (소스코드, 리소스)를 다운로드 받습니다.
2. 
- 카카오 REST API (https://developers.kakao.com/)
- 기상청 단기예보 API (https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084)
- 한국환경공단 측정소 정보 API (https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15073877)
- 한국환경공단 대기오염정보 API (https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15073861)
- 한국천문연구원 출몰시각정보 API (https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15012688)   

  모든 API를 활용 신청하고 키를 발급 받아 코드 내에 Key를 삽입합니다.

3. 크롬 확장 프로그램(chrome://extensions/) - 개발자 모드 활성화 - 압축해제된 확장 프로그램을 로드합니다. - 본 프로그램을 선택합니다.

### 안내사항
- 사용을 위해 위치 권한 설정이 필요합니다.

- 한국어 및 대한민국(한반도) 내 위치만 지원합니다.
(Only the Korean language and locations within the Republic of Korea are supported.)

- 사용된 리소스는 Microsoft Fluent UI Emoji를 사용했습니다. (https://github.com/microsoft/fluentui-emoji)


## 기능 및 작동 사진

### 기능

- 기상청 초단기실황 관측 값과 초단기예보 데이터로 비교적 정확한 날씨 정보를 제공합니다.
- 팝업 창의 색상은 사용자 위치의 일출 및 일몰 시간에 따라 변화합니다.
- 현재 위치를 기반으로 가장 가까운 대기 측정소의 미세먼지 데이터를 확인할 수 있습니다.

### 작동 사진
<div>
  <img src="https://lh3.googleusercontent.com/IWepTl9O8oKw36G3gpTtrcxzrbzYnI4IHYMCeNrbiUo10BQmWzaT4DCx8FI4NrS8obETGa_Od6RiHOavH0H1KPDC"/>
  <img src="https://lh3.googleusercontent.com/GKrJOSxTnwkPjRwMk8fQ4rJn39oC8RsF4K96CRuIkVRI16Dno5RyjYa58vKZ7MAN3t2jRURJlcepOYdrbARwJ3kDhLE"/>
<div>


## 기타
- 알려진 문제점
```
가끔 nominatim API를 호출 시 CORS 오류가 발생합니다. 
```
```
대기측정소 고장이나 통신오류 시 미세먼지 측정값이 누락될 수 있습니다.
```
