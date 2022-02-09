export type LocationState = {
  from: {
    pathname: string;
  };
};

export type Note = {
  title: string;
  content: string;
  userId: string;
  id: string;
};

export type Error={
  status: boolean;
  message: string|undefined;
}