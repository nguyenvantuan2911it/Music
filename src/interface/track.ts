import { Genre, Mood } from 'src/api/api';

export interface MusicType {
  type?: String | String[];
  trackType?: Mood | Genre;
  id?: string;
  skip?:number;
}
