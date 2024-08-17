import { Component, OnDestroy, OnInit, effect, inject } from '@angular/core';

import { BookedListing } from '../../../models/booking.model';
import { BookingService } from '../../../services/booking.service';
import { CardListingComponent } from '../../../components/card-listing/card-listing.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-booked-listing',
  standalone: true,
  imports: [CardListingComponent, FaIconComponent],
  templateUrl: './booked-listing.component.html',
  styleUrl: './booked-listing.component.scss',
})
export class BookedListingComponent implements OnInit, OnDestroy {
  bookingService = inject(BookingService);
  toastService = inject(ToastService);
  bookedListings = new Array<BookedListing>();

  loading = false;

  constructor() {
    this.listenFetchBooking();
    this.listenCancelBooking();
  }

  ngOnDestroy(): void {
    this.bookingService.resetCancel();
  }

  ngOnInit(): void {
    this.fetchBooking();
  }

  private fetchBooking() {
    this.loading = true;
    this.bookingService.getBookedListing();
  }

  onCancelBooking(bookedListing: BookedListing) {
    bookedListing.loading = true;
    this.bookingService.cancel(
      bookedListing.bookingPublicId,
      bookedListing.listingPublicId,
      false
    );
  }

  private listenFetchBooking() {
    effect(() => {
      const bookedListingsState = this.bookingService.getBookedListingSig();
      if (bookedListingsState.status === 'OK') {
        this.loading = false;
        this.bookedListings = bookedListingsState.value!;
      } else if (bookedListingsState.status === 'ERROR') {
        this.loading = false;
        this.toastService.send({
          severity: 'error',
          summary: 'Error when fetching the listing',
        });
      }
    });
  }

  private listenCancelBooking() {
    effect(() => {
      const cancelState = this.bookingService.cancelSig();
      if (cancelState.status === 'OK') {
        const listingToDeleteIndex = this.bookedListings.findIndex(
          (listing) => listing.bookingPublicId === cancelState.value
        );
        this.bookedListings.splice(listingToDeleteIndex, 1);
        this.toastService.send({
          severity: 'success',
          summary: 'Successfully cancelled booking',
        });
      } else if (cancelState.status === 'ERROR') {
        const listingToDeleteIndex = this.bookedListings.findIndex(
          (listing) => listing.bookingPublicId === cancelState.value
        );
        this.bookedListings[listingToDeleteIndex].loading = false;
        this.toastService.send({
          severity: 'error',
          summary: 'Error when cancel your booking',
        });
      }
    });
  }
}
