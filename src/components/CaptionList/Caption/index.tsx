/// <reference path="../interfaces.d.ts" />

import React, { Component } from 'react';
import * as Styled from './styles';

interface ICaptionProps {
  result: IZerothResult;
  isParitial: boolean;
  transition?: string;
}

class Caption extends Component<ICaptionProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { result, isParitial, transition } = this.props;
    const wordAlignment = result['word-alignment'] || [];
    return <>
        {isParitial ? <Styled.CaptionItem isPartial={isParitial} transition={transition}>
            {result.transcript}
      </Styled.CaptionItem> : <Styled.CaptionItem isPartial={isParitial} transition={transition}>
            {wordAlignment
              .map(({ word, confidence }, i) => (
                <Styled.FinalCaption confidence={confidence} key={i}>
                  {word}
                </Styled.FinalCaption>
              ))
              .reduce((acc: any[], cur) => {
                if (acc.length) {
                  acc.push(' ');
                  acc.push(cur);
                } else {
                  acc.push(cur);
                }
                return acc;
              }, [])}
          </Styled.CaptionItem>}
      </>;
  }
}

export default Caption;
