# Micro-Weather-Standalone

Micro-Weather-Standalone은 Micro-Weather (https://github.com/tombeom/Micro-Weather) 의 독립 실행형 버전(구버전)으로 

별도의 서버 없이 작동할 수 있는 크롬 확장 프로그램입니다.

각종 API를 사용해 브라우저에서 팝업 형식으로 손쉽게 날씨, 미세먼지 정보 등을 확인할 수 있습니다.

## 기능 및 안내사항

### 기능

- 기상청 초단기실황 관측 값과 초단기예보 데이터로 비교적 정확한 날씨 정보를 제공합니다.
- 팝업 창의 색상은 사용자 위치의 일출 및 일몰 시간에 따라 변화합니다.
- 현재 위치를 기반으로 가장 가까운 대기 측정소의 미세먼지 데이터를 확인할 수 있습니다.

### 안내사항
- 사용을 위해 위치 권한 설정이 필요합니다.

- 한국어 및 대한민국(한반도) 내 위치만 지원합니다.
(Only the Korean language and locations within the Republic of Korea are supported.)

- 사용된 리소스는 Microsoft Fluent UI Emoji를 사용했습니다. (https://github.com/microsoft/fluentui-emoji)

## 사용 기술 및 배포 URL

### 사용 기술

<div>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
<div>

### 배포 URL
> **가급적 Micro-Weather (https://github.com/tombeom/Micro-Weather) 를 사용하는 것을 권장합니다.**
  - https://github.com/tombeom/Micro-Weather-Standalone/releases
      - 다운로드 후 안내에 따라 설치

## 기타

### 작동 사진
<div>
  <img src="https://lh3.googleusercontent.com/IWepTl9O8oKw36G3gpTtrcxzrbzYnI4IHYMCeNrbiUo10BQmWzaT4DCx8FI4NrS8obETGa_Od6RiHOavH0H1KPDC"/>
  <img src="https://lh3.googleusercontent.com/GKrJOSxTnwkPjRwMk8fQ4rJn39oC8RsF4K96CRuIkVRI16Dno5RyjYa58vKZ7MAN3t2jRURJlcepOYdrbARwJ3kDhLE"/>
<div>

### 함수 실행 순서
```
init()
  -setCoordinate() - location.js
    setAddress() - location.js
	    drawPosition() - draw.js
      getSunRiseSetData - sunRiseSet.js
        setBG() - sunRiseSet.js
  -convertCoordToGridCoord() - location.js
  -convertCoordToTMCoord() - particulateMatter.js
    getStaionInfo() - particulateMatter.js
      getPM() - particulateMatter.js
        setPM() - particulateMatter.js
        drawPM() - draw.js
  -getNowcast() - weather.js
    getForecast() - weather.js
      drawNcst() - draw.js
      drawFcst() - draw.js
```
  
### 알려진 문제점
```
가끔 nominatim API를 호출 시 CORS 오류가 발생합니다. 
```
```
대기측정소 고장이나 통신오류 시 미세먼지 측정값이 누락될 수 있습니다.
```
