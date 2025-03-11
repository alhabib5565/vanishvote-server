export type TOption = {
  id: number;
  text: string;
  votes: TVote[];
};

export type TVote = {
  ip: string;
  comment: string;
};
export type TPollData = {
  title: string;
  pollType: string;
  options: TOption[];
  settings: {
    allowMultipleSelection: { type: string };
    requireParticipantNames: boolean;
    resultsVisibility: string;
    pollExpiryDate: string;
    allowComments: boolean;
  };
};
