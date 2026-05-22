function createVideo(src, poster) {
  const video = document.createElement('video');
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('aria-hidden', 'true');
  if (poster) video.poster = poster;

  const source = document.createElement('source');
  source.src = src;
  source.type = 'video/mp4';
  video.append(source);
  return video;
}

export default function decorate(block) {
  const videoLink = block.querySelector('a[href$=".mp4"]');
  if (!videoLink) return;

  const picture = block.querySelector('picture');
  const poster = picture?.querySelector('img')?.currentSrc || picture?.querySelector('img')?.src;
  const media = document.createElement('div');
  media.className = 'hero-media';
  media.append(createVideo(videoLink.href, poster));
  if (picture) media.append(picture);

  const content = document.createElement('div');
  content.className = 'hero-content';
  const contentSource = block.children[1]?.querySelector('div') || block;
  [...contentSource.childNodes].forEach((child) => {
    if (child !== picture && !child.contains?.(videoLink)) content.append(child);
  });

  block.replaceChildren(media, content);
}
