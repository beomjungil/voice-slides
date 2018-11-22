import styled from 'styled-components';

export const SlideHolder = styled.div`
  ${(props: { isFull: boolean }) =>
    props.isFull
      ? `width: 100vw;
       height: 100vh;
       display: flex;
       align-items: center;
       justify-contents: center;`
      : `width: 600px;`}
`;
