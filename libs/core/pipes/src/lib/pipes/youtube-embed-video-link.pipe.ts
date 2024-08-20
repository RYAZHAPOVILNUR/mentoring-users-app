import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'youtubeEmbedLink',
  pure: true,
  standalone: true,
})
export class YoutubeEmbedLinkPipe implements PipeTransform {

  transform(value: string) {
    const result = value.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/)
    const videoID = result? result[1] : 'нет ничего'
    return `https://www.youtube.com/embed/${videoID}`
  }
}
