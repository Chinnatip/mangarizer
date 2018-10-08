import styled from 'styled-components'

const imageAmount = 60 + 1
const imageWidth = 540
export const Canvas = styled.div`
  flex-grow: 1;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
  div._container {
    height: 100%;
    width: ${imageAmount * imageWidth}px;
    span._lefter {
      display: inline-block;
      h2 {
        font-family: 'Montserrat';
        font-weight: 300;
      }
      hr {
        opacity: 0.3;
        margin: 13px 0;
      }
      .ant-select-auto-complete {
        width: 180px;
        vertical-align: top;
      }
      .ant-input-chapter {
        margin-left: 10px;
        width: 100px;
        vertical-align: top;
      }
      @media (min-width: 700px) {
        width: 30vw;
        margin-left: 2vw;
      }
    }
    img {
      height: 98%;
      margin-right: 4px;
      cursor: pointer;
      transition: 0.35s;
      @media (min-width: 700px) {
        opacity: 0.28;
        &._active {
          opacity: 1;
          box-shadow: 0 0 5px grey;
        }
      }
    }
  }
`
