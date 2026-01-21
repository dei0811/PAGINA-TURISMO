export const GET_CONTENT_BY_LANG = `
  *[_type == "completeContent" && lang == $lang][0] {
    heroTag,
    heroTitle,
    heroTitleHighlight,
    heroSubtitle,
    btnReserve,
    tourZonesTitle,
    tourZonesSubtitle,
    liveTitle,
    whyTitle,
    whyUs,
    footerTag,
    points,
    videos[] {
      title,
      "videoUrl": videoFile.asset->url,
      "thumbnailUrl": thumbnail.asset->url
    }
  }
`
