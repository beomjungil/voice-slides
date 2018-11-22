/// <reference path="./interfaces.d.ts" />

import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import Fullscreen from 'react-full-screen';
import * as Styled from './styles';
import { inject, observer } from 'mobx-react';
import { SlideStore } from '../../stores/slideStore';
import CaptionList from '../CaptionList';
import { TranscriptionStore } from '../../stores/transcriptionStore';
import ZerothController from '../Transcription';

interface InjectedProps {
  slideStore?: SlideStore;
}

@inject('slideStore')
@observer
class Slides extends Component<InjectedProps, {}> {
  state = { numPages: null, isFull: false };

  addKeyListener = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  };
  removeKeyListener = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 39) {
      this.goToNextPage();
      return;
    }
    if (e.keyCode === 37) {
      this.goToPrevPage();
      return;
    }
  };

  handleFullscreen = (isFull: boolean) => {
    this.setState({ isFull });
    isFull ? this.addKeyListener() : this.removeKeyListener();
  };

  onDocumentLoadSuccess = ({ numPages }: IOnDocumentLoadProps) => {
    this.setState({ numPages });
  };

  goToPrevPage = () => {
    const slideStore = this.props.slideStore as SlideStore;
    slideStore.goToPrevPage();
  };

  goToNextPage = () => {
    const slideStore = this.props.slideStore as SlideStore;
    slideStore.goToNextPage();
  };

  goFull = () => {
    this.setState({ isFull: true });
  };

  render() {
    const { numPages } = this.state;
    const { pageNumber } = this.props.slideStore as SlideStore;
    return (
      <div>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
          <button onClick={this.goFull}>Go Fullscreen</button>
        </nav>
        <Fullscreen
          enabled={this.state.isFull}
          onChange={this.handleFullscreen}
        >
          <Styled.SlideHolder isFull={this.state.isFull}>
            <Document
              file="/test.pdf"
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page
                pageNumber={pageNumber}
                width={this.state.isFull ? window.innerWidth : 600}
              />
            </Document>
            <p
              style={
                this.state.isFull
                  ? { position: 'absolute', bottom: '0' }
                  : { position: 'relative' }
              }
            >
              Page {pageNumber} of {numPages}
            </p>
            <CaptionList />
            <ZerothController />
          </Styled.SlideHolder>
        </Fullscreen>
      </div>
    );
  }
}

export default Slides;
