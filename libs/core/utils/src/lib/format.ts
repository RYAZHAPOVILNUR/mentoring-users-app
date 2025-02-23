export const isVideo = function (link: string): boolean {
    return link.includes('youtube.com') || link.includes('youtu.be') || /\.(mp4|mov|avi|mkv|webm)$/i.test(link);
}

export const isPdf = function (link: string): boolean {
    return link.includes('drive.google.com') || /\.pdf(\?.*)?(#.*)?$/i.test(link);
}

export const isAudio = function (link: string): boolean {
    return /\.(mp3|wav|ogg|flac)$/i.test(link);
}