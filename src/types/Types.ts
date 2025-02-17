export interface GameDetails {
  id: string;
  name: string;
  size: string;
  date: string;
  time: string;
  locationUrl: string;
  matchFee: number;
  lineup: string[];
  availableSlots: number;
  waitingList: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}
