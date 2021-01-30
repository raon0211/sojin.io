import {
  NotionCollectionItemSchema,
  NotionCollectionSchemaType,
} from '../../remotes/types/collection'
import { NotionBlock } from './block'

export interface NotionPageBlock {
  id: string
  type: 'page'
  parentId: string
  title: string | null
  properties: { [propertyName: string]: NotionPageBlockProperty | undefined }
}

export type NotionPageBlockProperty =
  | NotionPageBlockCheckboxProperty
  | NotionPageBlockTextProperty
  | NotionPageBlockTitleProperty
  | NotionPageBlockDateProperty

export interface NotionPageBlockCheckboxProperty {
  type: NotionCollectionSchemaType.checkbox
  name: string
  id: string
  value: boolean
}

export interface NotionPageBlockTextProperty {
  type: NotionCollectionSchemaType.text
  name: string
  id: string
  value: string | null
}

export interface NotionPageBlockTitleProperty {
  type: NotionCollectionSchemaType.title
  name: string
  id: string
  value: string | null
}

export interface NotionPageBlockDateProperty {
  type: NotionCollectionSchemaType.date
  name: string
  id: string
  value: string
}

export function isPageBlock(block: NotionBlock): block is NotionPageBlock {
  return block.type === 'page'
}

export function parseNotionPageBlockProperty(
  schema: NotionCollectionItemSchema,
  key: string,
  value: string[][] | undefined
): NotionPageBlockProperty | null {
  const schemaItem = schema[key]

  if (schemaItem == null) {
    throw new Error(
      `Expected schemaID '${key}' to be contained in schema, but received: ${JSON.stringify(
        schema
      )}`
    )
  }

  switch (schemaItem.type) {
    case NotionCollectionSchemaType.checkbox: {
      return {
        type: NotionCollectionSchemaType.checkbox,
        id: key,
        name: schemaItem.name,
        value: value?.[0][0] === 'Yes',
      }
    }
    case NotionCollectionSchemaType.text:
    case NotionCollectionSchemaType.title: {
      return {
        type: schemaItem.type,
        id: key,
        name: schemaItem.name,
        value: value?.[0][0] ?? null,
      }
    }
    case NotionCollectionSchemaType.date: {
      const rawProperty: {
        start_date: string
        // TODO: Fix typing of value
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } = value?.[0][1][0][1] as any

      return {
        type: NotionCollectionSchemaType.date,
        id: key,
        name: schemaItem.name,
        value: rawProperty.start_date,
      }
    }
    default: {
      return null
    }
  }
}

type PropertyOfType<Type> = Type extends NotionCollectionSchemaType
  ? {
      [T in NotionPageBlockProperty['type']]: Extract<
        NotionPageBlockProperty,
        { type: T }
      >
    }[Type]
  : never

export function parsePropertyValueOfType<
  Type extends NotionCollectionSchemaType
>(
  property: NotionPageBlockProperty | undefined,
  type: Type
): PropertyOfType<Type>['value'] | null {
  if (property == null) {
    return null
  }

  if (property.type !== type) {
    throw new Error(
      `Expected property to be of type ${type}, but got ${property.type}`
    )
  }

  return property.value
}
