import { Dispatch, SetStateAction } from 'react';
import { PanResponderInstance } from 'react-native';

export type Quote = {
  author: string;
  text: string;
};

export type QuoteBoxProps = {
  quote: Quote;
  isFullScreen: boolean;
  setIsFullScreen: any;
};

export type Book = {
  id: string;
  title: string;
  image: string;
};
