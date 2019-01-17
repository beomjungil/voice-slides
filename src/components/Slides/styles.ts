import styled from 'styled-components';

export const SlideHolder = styled.div`
  ${(props: { isFull: boolean }) =>
    props.isFull
      ? `width: 100vw;
       height: 100vh;
       display: flex;
       align-items: center;
       justify-contents: center;`
      : `width: 720px;`}
  div.react-pdf__Document {
    width: 100%;
    canvas {
      border-radius: 0.25rem 0.25rem 0 0;
      overflow: hidden;
      width: 100% !important;
    }
  }
`;

export const ControlBar = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 0 0 0.25rem 0.25rem;
  box-shadow: 0 0.125rem 0.75rem rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  ${(props: { isFull: boolean }) =>
    props.isFull &&
    `
    background: none;
    position: fixed;
    left: 1rem;
    bottom: .5rem;
    opacity: .2;
    color: #ffffff;
    width: 600px;

    &:hover {
      opacity: 1;
    }
  `}
`;

export const ZerothControlBar = styled(ControlBar)`
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.75rem rgba(0, 0, 0, 0.05);
  margin-top: .5rem;
  ${(props: { isFull: boolean }) =>
    props.isFull &&
    `
    display: none;
  `}
`;

export const Gap = styled.div`
  width: ${(props: { size: string }) => props.size};
  height: ${(props: { size: string }) => props.size};
  flex-grow: 0;
  flex-shrink: 0;
`;

export const EmptyButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  margin: none;
  border-radius: 0.25rem;
  padding: 0.5rem 0 0;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  margin-right: 1rem;
  &:before {
    content: '';
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
    width: 0%;
    padding-top: 0%;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    transform: translateX(-50%) translateY(-50%);
    transition: width 0.25s cubic-bezier(0.455, 0.03, 0.515, 0.955),
      padding-top 0.25s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }
  &:hover:before {
    width: 70%;
    padding-top: 70%;
  }
  &:active,
  &:focus {
    outline: none;
  }
`;