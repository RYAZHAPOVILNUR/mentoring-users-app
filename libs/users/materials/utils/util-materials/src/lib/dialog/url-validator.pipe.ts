import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'urlValidator',
  pure: false,
})
export class LinkErrorTextPipe implements PipeTransform {
  transform(errors: ValidationErrors) {
    const error = Object.keys(errors)[0];
    switch (error) {
      case 'required':
        return 'Link cannot be empty!';
      case 'notYouTubeUrl':
        return 'Enter a YouTube URL!';
      case 'notPdfUrl':
        return 'Enter a PDF URL!';
      case 'notAudioUrl':
        return 'Enter an audio URL!';
      default:
        return 'Field is not valid!';
    }
  }
}
