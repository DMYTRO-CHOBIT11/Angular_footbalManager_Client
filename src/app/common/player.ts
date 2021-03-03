import { Team } from './team';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn } from 'typeorm/browser';


export class Player {

  id: number;

  full_name: string;

  birthday: Date;

  start_career: Date;
  team: Team;
}
