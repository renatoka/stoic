export type Quote = {
  id: string;
  author: string;
  text: string;
};

export type QuoteBoxProps = {
  quote: Quote;
};

export type Book = {
  id: string;
  title: string;
  image: string;
};
