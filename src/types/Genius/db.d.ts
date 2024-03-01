export type cat_type = db_item[];

export interface db_item {
  Image: string;
  Category: string;
  Sound: string;
  Title: string;
  _ID: number;
}
export type setting_type = seeting_db[];

export interface seeting_db {
  Swipe: string;
  RandomOrder: string;
  Game: string;
  Voice: string;
  GameLevel: string;
  _id: number;
}
