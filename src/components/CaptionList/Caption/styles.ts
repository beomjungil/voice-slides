import styled from 'styled-components';

interface ICaptionItemProps {
  isPartial: boolean;
  transition: string | undefined;
}
export const CaptionItem = styled.p`
  padding: 0.5rem 1rem;
  background: ${(props: ICaptionItemProps) =>
    props.isPartial ? 'rgba(0, 0, 0, 0.5);' : 'rgba(0, 0, 0, 0.8);'};
  border-radius: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  flex: 0 0 auto;
  display: inline-block;
  margin: 0 0 0.25em;
  transition: opacity .5s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  opacity: ${(props: ICaptionItemProps) => props.transition === 'exiting'
      ? '0'
      : '1'};
`;

export const FinalCaption = styled.span`
  color: ${(props: { confidence: number }) =>
    `rgba(255, 255, 255, ${props.confidence})`};
`;
