import { Dayjs } from 'dayjs';
import { DisplayPicture } from './listing.model';
import { PriceVO } from './listing-vo.model';

export interface BookedDatesDTOFromServer {
  startDate: Date;
  endDate: Date;
}

export interface BookedListing {
  location: string;
  cover: DisplayPicture;
  totalPrice: PriceVO;
  dates: BookedDatesDTOFromServer;
  bookingPublicId: string;
  listingPublicId: string;
  loading: boolean;
}

export interface CreateBooking {
  startDate: Date;
  endDate: Date;
  listingPublicId: string;
}

export interface BookedDatesDTOFromClient {
  startDate: Dayjs;
  endDate: Dayjs;
}

export interface BookedDatesDTOFromServer {
  startDate: Date;
  endDate: Date;
}

export interface BookedListing {
  location: string;
  cover: DisplayPicture;
  totalPrice: PriceVO;
  dates: BookedDatesDTOFromServer;
  bookingPublicId: string;
  listingPublicId: string;
  loading: boolean;
}
