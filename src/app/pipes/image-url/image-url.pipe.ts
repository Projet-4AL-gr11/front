import {Inject, Injectable, Pipe, PipeTransform} from '@angular/core';
import {environment} from "../../../environments/environment";
import {MediaService} from "../../services/media/media.service";
import {firstValueFrom} from "rxjs";

@Injectable()
@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {


  constructor(private mediaService: MediaService) {
  }

  async transform(value: string, x: number = 50, y: number = 50, returnOther: boolean = true, ...args: unknown[]): Promise<string> {
    let returnValue;
    if (value) {
      await firstValueFrom(this.mediaService.getPictureRefresh(value)).then(
        picture => returnValue = picture.url
      )

      return returnValue;
    } else if (returnOther) {
      return `https://picsum.photos/${x}/${y}`;
    }
    return undefined;
  }

}
