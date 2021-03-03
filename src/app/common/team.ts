import {Player} from './player';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Observable } from 'rxjs';

export class Team {
  id: number;

  name: string;

  country: string;

  city: string;
  budget: number;

  players: Player[];
}
