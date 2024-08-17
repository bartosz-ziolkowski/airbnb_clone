import { Component, input } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [NgClass, FontAwesomeModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  imageUrl = input<string>();
  avatarSize = input<'avatar-sm' | 'avatar-xl'>();
}
