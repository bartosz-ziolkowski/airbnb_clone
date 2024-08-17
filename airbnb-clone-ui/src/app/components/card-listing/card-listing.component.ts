import {
  Component,
  EventEmitter,
  Output,
  effect,
  inject,
  input,
} from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { BookedListing } from '../../models/booking.model';
import { CardListing } from '../../models/listing.model';
import { CategoryService } from '../../services/category.service';
import { CountryService } from '../../services/country.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-listing',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, FaIconComponent],
  templateUrl: './card-listing.component.html',
  styleUrl: './card-listing.component.scss',
})
export class CardListingComponent {
  listing = input.required<CardListing | BookedListing>();
  cardMode = input<'landlord' | 'booking'>();

  @Output()
  deleteListing = new EventEmitter<CardListing>();
  @Output()
  cancelBooking = new EventEmitter<BookedListing>();

  bookingListing: BookedListing | undefined;
  cardListing: CardListing | undefined;

  router = inject(Router);
  categoryService = inject(CategoryService);
  countryService = inject(CountryService);

  constructor() {
    this.listenToListing();
    this.listenToCardMode();
  }

  private listenToListing() {
    effect(() => {
      const listing = this.listing();
      this.countryService.getCountryByCode(listing.location).subscribe({
        next: (country) => {
          if (listing) {
            this.listing().location =
              country.region + ', ' + country.name.common;
          }
        },
      });
    });
  }

  private listenToCardMode() {
    effect(() => {
      const cardMode = this.cardMode();
      if (cardMode && cardMode === 'booking') {
        this.bookingListing = this.listing() as BookedListing;
      } else {
        this.cardListing = this.listing() as CardListing;
      }
    });
  }

  onDeleteListing(displayCardListingDTO: CardListing) {
    this.deleteListing.emit(displayCardListingDTO);
  }

  onCancelBooking(bookedListing: BookedListing) {
    this.cancelBooking.emit(bookedListing);
  }

  onClickCard(publicId: string) {
    this.router.navigate(['listing'], { queryParams: { id: publicId } });
  }
}
