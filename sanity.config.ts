import {visionTool} from '@sanity/vision'
import {Bone, Cable, FlipHorizontal, PocketKnife, ScanHeart} from 'lucide-react'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {IconManager} from 'sanity-plugin-icon-manager'
// Sanity plugins
import {imageAssetPickerPlugin} from 'sanity-plugin-image-asset-picker'
import {media} from 'sanity-plugin-media'
import {noteField} from 'sanity-plugin-note-field'
import {ptString} from 'sanity-plugin-pt-string'
import {seoMetaFields} from 'sanity-plugin-seo'
import {singletonTools} from 'sanity-plugin-singleton-tools'
import {tags} from 'sanity-plugin-tags'
import {userSelect} from 'sanity-plugin-user-select-input'

import {sharedSchemaTypes} from './src/schemaTypes'
import {consentSchemaTypes} from './src/schemaTypes/consent'
import {filosoSchemaTypes} from './src/schemaTypes/filoso'
import {linksSchemaTypes} from './src/schemaTypes/links'
import {loveSchemaTypes} from './src/schemaTypes/love-hangover'
import {mirrorSchemaTypes} from './src/schemaTypes/mirror'

const sharedConfig = {
  projectId: 'ioq9oqcu',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
    media(),
    seoMetaFields(),
    imageAssetPickerPlugin(),
    userSelect(),
    tags({
      // your optional configuration here
    }),
    noteField(),
    IconManager({
      // your optional configuration here
    }),
    ptString(),
    singletonTools(),
  ],
}

export default defineConfig([
  {
    name: 'consent',
    title: 'Consent Press',
    ...sharedConfig,
    icon: Bone,
    plugins: [...sharedConfig.plugins],
    schema: {
      types: consentSchemaTypes,
    },
    basePath: '/consent',
  },
  {
    name: 'filoso',
    title: 'Filoso',
    ...sharedConfig,
    icon: PocketKnife,
    plugins: [...sharedConfig.plugins],
    schema: {
      types: filosoSchemaTypes,
    },
    basePath: '/filoso',
  },
  {
    name: 'links',
    title: 'Links',
    ...sharedConfig,
    icon: Cable,
    plugins: [...sharedConfig.plugins],
    schema: {
      types: linksSchemaTypes,
    },
    basePath: '/links',
  },
  {
    name: 'love',
    title: 'Love Hangover',
    ...sharedConfig,
    icon: ScanHeart,
    plugins: [...sharedConfig.plugins],
    schema: {
      types: loveSchemaTypes,
    },
    basePath: '/love',
  },
  {
    name: 'mirror',
    title: 'Mirror',
    ...sharedConfig,
    icon: FlipHorizontal,
    plugins: [...sharedConfig.plugins],
    schema: {
      types: mirrorSchemaTypes,
    },
    basePath: '/mirror',
  },
])
