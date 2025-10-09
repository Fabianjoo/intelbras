document.querySelectorAll('.thumb').forEach(img => {
    img.addEventListener('click', () => {
      const videoId = img.dataset.videoId;
      const iframe = document.createElement('iframe');
      iframe.width = "560";
      iframe.height = "315";
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.title = "YouTube video player";
      iframe.frameBorder = "0";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
  
      img.replaceWith(iframe);
    });
  });
  