import { BookedListingComponent } from './pages/tenant/booked-listing/booked-listing.component';
import { DisplayListingComponent } from './pages/tenant/display-listing/display-listing.component';
import { HomeComponent } from './pages/home/home.component';
import { PropertiesComponent } from './pages/landlord/properties/properties.component';
import { ReservationComponent } from './pages/landlord/reservation/reservation.component';
import { Routes } from '@angular/router';
import { authorityRouteAccess } from './services/authority-route-access';

export const routes: Routes = [
  {
    path: 'landlord/properties',
    component: PropertiesComponent,
    canActivate: [authorityRouteAccess],
    data: {
      authorities: ['ROLE_LANDLORD'],
    },
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'listing',
    component: DisplayListingComponent,
  },
  {
    path: 'booking',
    component: BookedListingComponent,
  },
  {
    path: 'landlord/reservation',
    component: ReservationComponent,
    canActivate: [authorityRouteAccess],
    data: {
      authorities: ['ROLE_LANDLORD'],
    },
  },
];
