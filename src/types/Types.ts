export interface GameDetails {
  id: string;
  name: string;
  size: number;
  date: string;
  time: string;
  locationUrl: string;
  matchFee: number;
  lineup: Player[];
  availableSlots: number;
  waitingList: Player[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface Player {
  id?: string;
  name: string;
  withPlayer: string | null;
}
