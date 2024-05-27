import { Color } from '../../shared/types';

export type Category = {
  id: number;
  group?: CategoryGroup;
  wording: string;
  description?: string;
};

export type CategoryGroup = {
  id: number;
  name: string;
  color?: `m-${Color}`;
};
