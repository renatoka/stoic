export type Quote = {
  author: string;
  text: string;
};

export type QuoteBoxProps = {
  quote: Quote;
  isFullScreen: boolean;
  toggleFullScreen: () => void;
};

export type Book = {
  id: string;
  title: string;
  image: string;
};
