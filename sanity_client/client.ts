import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'vlplwrl6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder: any = imageUrlBuilder(client)  // <-- forzamos a any
export const urlFor = (source: any) => builder.image(source)
