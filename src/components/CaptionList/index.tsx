/// <reference path="./interfaces.d.ts" />

import React, { Component } from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';
import { inject, observer } from 'mobx-react';
import shortid from 'shortid';
import Caption from './Caption';
import { TranscriptionStore } from '../../stores/transcriptionStore';
import * as Styled from './styles';
import { observable } from 'mobx';

interface ICaptionListProps {
  transcriptionStore?: TranscriptionStore;
}

@inject('transcriptionStore')
@observer
class CaptionList extends Component<ICaptionListProps, {}> {
  private messageList: React.RefObject<HTMLDivElement>;
  constructor(props: ICaptionListProps) {
    super(props);
    this.messageList = React.createRef();
  }
  private duration: number = 2000;
  @observable private in: boolean = false;

  scrollToBottom = () => {
    const { current: messageList } = this.messageList;
    const scrollHeight = messageList!.scrollHeight;
    const height = messageList!.clientHeight;
    const maxScrollTop = scrollHeight - height;
    messageList!.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { partialResult, histories } = this.props
      .transcriptionStore as TranscriptionStore;
    return (
      <Styled.CaptionHolder ref={this.messageList}>
        <TransitionGroup component={null}>
          {histories
            .slice(histories.length - 2, histories.length)
            .map(value => (
              <Transition
                key={value.id}
                timeout={this.duration}
                appear={true}
                mountOnEnter
                unmountOnExit
              >
                {status => (
                  <Caption
                    isParitial={false}
                    result={value}
                    transition={status}
                  />
                )}
              </Transition>
            ))}
        </TransitionGroup>
        {partialResult !== '' && (
          <Caption
            isParitial={true}
            result={{ final: false, transcript: partialResult }}
          />
        )}
      </Styled.CaptionHolder>
    );
  }
}

export default CaptionList;
