/// <reference path="./interfaces.d.ts" />

import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import Fullscreen from 'react-full-screen';
import * as Styled from './styles';
import { inject, observer } from 'mobx-react';
import { SlideStore } from '../../stores/slideStore';
import CaptionList from '../CaptionList';
import { Box, Flex } from '@rebass/grid';
import TranscriptionList from '../TranscriptionList';
import ZerothController from '../ZerothController';
import MaterialIcon from 'material-icons-react';

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
    this.setState({ isFull: !this.state.isFull });
  };

  render() {
    const { numPages, isFull } = this.state;
    const { pageNumber } = this.props.slideStore as SlideStore;
    return <div>
        <Fullscreen enabled={isFull} onChange={this.handleFullscreen}>
          <Flex>
            <Box width={isFull ? '100vw' : 720} flex="0 0 auto">
              <Styled.SlideHolder isFull={isFull}>
                <Document file="/test.pdf" onLoadSuccess={this.onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} width={isFull ? window.innerWidth : 720} />
                </Document>
              </Styled.SlideHolder>
              {isFull && <CaptionList />}
              <Styled.ControlBar isFull={isFull}>
                <nav>
                  <Styled.EmptyButton onClick={this.goToPrevPage}>
                    <MaterialIcon icon="skip_previous" />
                  </Styled.EmptyButton>
                  <Styled.EmptyButton onClick={this.goToNextPage}>
                    <MaterialIcon icon="skip_next" />
                  </Styled.EmptyButton>
                  <Styled.EmptyButton onClick={this.goFull}>
                    {isFull ? (
                      <MaterialIcon icon="fullscreen" />
                    ) : (
                      <MaterialIcon icon="fullscreen_exit" />
                    )}
                  </Styled.EmptyButton>
                </nav>

                <p>
                  Page {pageNumber} of {numPages}
                </p>
              </Styled.ControlBar>
              {!isFull && <Styled.ZerothControlBar isFull={isFull}>
                  <ZerothController />
                </Styled.ZerothControlBar>}
            </Box>

            {!isFull && <>
                <Styled.Gap size="1rem" />
                <Box flex="1 1 auto">
                  <TranscriptionList />
                </Box>
              </>}
          </Flex>
        </Fullscreen>
      </div>;
  }
}

export default Slides;
