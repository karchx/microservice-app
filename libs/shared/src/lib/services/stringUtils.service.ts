import { Injectable } from '@nestjs/common';
import * as slug from 'slug';

@Injectable()
export class StringUtilService {
  slugify(title: string) {
    return (
      slug(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
