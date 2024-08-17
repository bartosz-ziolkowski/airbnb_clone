import { BookedDatesDTOFromServer } from './booking.model';
import { NewListingInfo } from './listing.model';

export interface Search {
  location: string;
  dates: BookedDatesDTOFromServer;
  infos: NewListingInfo;
}
