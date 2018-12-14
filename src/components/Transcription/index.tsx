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
      appId: 'c112ec6898bf49b58d24348f226e1f7a',
      appSecret: 'JQE6ZJQx9d84ec7abbf94b65bff35d88273c23e3',
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
