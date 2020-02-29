import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  private appIconsRegistry = ['keyboard-arrow-up', 'keyboard-arrow-down', 'build', 'save', 'save-o', 'delete', 'cancel', 'cancel-o', 'add', 'add-o', 'edit', 'plus'];
  private categoryIconsRegistry = ['apartment', 'armchair', 'baby', 'bag', 'ball', 'bank', 'basket', 'beer', 'bicycle', 'bike', 'bills', 'boat', 'book', 'bottle', 'box', 'brush', 'bus', 'cabinet', 'camera', 'can', 'car', 'card', 'cat', 'chainsaw', 'chef', 'chip', 'cinema', 'cloth', 'cocktail', 'coffee', 'coins', 'cook', 'devices', 'dining', 'dog', 'fire', 'fish', 'flatiron', 'flower', 'football', 'fridge', 'gamepad', 'gas', 'gift', 'givecoins', 'glasses', 'grape', 'guitar', 'gun', 'gym', 'haircut', 'hearths', 'high-heeled', 'horse', 'house', 'ice-cream', 'kid', 'kitchen', 'laptop', 'lightning', 'medkit', 'metro', 'minicard', 'mobile', 'moneybag', 'movie', 'muscle', 'pacifier', 'palm', 'phone', 'pig', 'pigybank', 'plane', 'police', 'pram', 'relationshiop', 'roller', 'rugby', 'scooter', 'screwdriver', 'shear', 'shoe', 'ski', 'skirt', 'smartphone', 'smile', 'smoke', 'sports', 'store', 'strawberry', 'studies', 'sushi', 'taxi', 'tennis', 'thermo', 'toiletery', 'tool', 'towel', 'toy', 'train', 'trumet', 'violin', 'washing-machine', 'web', 'wheel', 'wrench'];

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.registerAppIcons();
    this.registerCategoryIcons();
  }

  get categoryIcons(): string[] {
    return [...this.categoryIconsRegistry];
  }

  private registerAppIcons(): void {
    for (const icon of this.appIconsRegistry) {
      this.registerIcon('app_icons', icon);
    }
  }

  private registerCategoryIcons(): void {
    for (const icon of this.categoryIconsRegistry) {
      this.registerIcon('category_icons', icon);
    }
  }

  private registerIcon(path: string, icon: string): void {
    this.iconRegistry.addSvgIcon(icon, this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${path}/${icon}.svg`));
  }
}
