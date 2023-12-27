export interface Note {
  id: string
  title: string
  patientId: number
  userId: number
  recordingId: number
  createdAt: string
  updatedAt: string
  blocks: Block[]
  noteFormat: string
  customPrompt: string
  preferredLength: string
  noteSetting: string
  isProcessed: boolean
}

export interface Block {
  extraInformation: ExtraInformation
  type: string
  id: string
  tagName: string
  content: Content
}

export interface ExtraInformation {
  additionalProp1: AdditionalProp1
  additionalProp2: AdditionalProp2
  additionalProp3: AdditionalProp3
}

export interface AdditionalProp1 {}

export interface AdditionalProp2 {}

export interface AdditionalProp3 {}

export interface Content {
  encoded: string
  values: Value[]
}

export interface Value {
  additionalProp1: string
  additionalProp2: string
  additionalProp3: string
}
