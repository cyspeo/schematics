import { OptionDto } from 'src/app/shared/bia-shared/model/option-dto';

export interface @Name@ {
  id: number;
  msn: string;
  isActive: boolean;
  lastFlightDate: Date;
  deliveryDate: Date;
  syncTime: string;
  capacity: number;
  siteId: number;
  connectingAirports: OptionDto[];
  @name@Type: OptionDto | null;
}
