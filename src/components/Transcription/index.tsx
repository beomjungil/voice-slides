/// <reference path="./interfaces.d.ts" />

import React, { Component } from 'react';
import { ZerothMic } from 'zeroth-js';
import { observer, inject } from 'mobx-react';
import { TranscriptionStore } from '../../stores/transcriptionStore';
import { SlideStore } from '../../stores/slideStore';

interface InjectedProps {
  transcriptionStore?: TranscriptionStore;
  slideStore?: SlideStore;
} 

@inject('transcriptionStore', 'slideStore')
@observer
class ZerothController extends Component<InjectedProps, {}> {
  private zeroth: any;
  constructor(props: any) {
    super(props);
    this.zeroth = new ZerothMic({
      appId: 'd8e3cfc44b7b4bd7a2aa25dec58c9700',
      appSecret: 'QD52ml1O39b9590dade74a47a0bd352c15b9ce45',
      language: 'kor',
      debug: true
    });
  }

  startRecording = () => {
    const transcriptionStore = this.props
      .transcriptionStore as TranscriptionStore;
    const slideStore = this.props.slideStore as SlideStore;
    this.zeroth.start().then(() => {
      this.zeroth.ondata = (data: IZerothResult) => {
        if(data.final && data.transcript.includes('다음')) {
          slideStore.goToNextPage();
        }
        transcriptionStore.updateResult(data);
      };
    });
  };

  stopRecording = () => {
    this.zeroth.stop();
  };
  render() {
    return (
      <div>
        <button onClick={this.startRecording}>Start</button>
        <button onClick={this.stopRecording}>Stop</button>
      </div>
    );
  }
}

export default ZerothController;
