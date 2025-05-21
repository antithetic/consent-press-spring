import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'

import {Bone, FlipHorizontal, PocketKnife, ScanHeart} from 'lucide-react'


import {consentSchemaTypes} from './src/schemaTypes/consent'
import {filosoSchemaTypes} from './src/schemaTypes/filoso'
import {loveSchemaTypes} from './src/schemaTypes/love-hangover'
import {mirrorSchemaTypes} from './src/schemaTypes/mirror'

const sharedConfig = {
  projectId: 'ioq9oqcu',
  dataset: 'production',
  plugins: [
    structureTool(), 
    visionTool(),
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
