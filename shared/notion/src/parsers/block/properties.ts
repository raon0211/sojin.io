import { createObjectByKey, isNotNil } from '@sojin/utils'
import { NotionPageBlockProperty } from '../../models/blocks/page'
import { NotionPageBlockResponse } from '../../remotes/types/block'
import {
  NotionCollectionItemSchema,
  NotionCollectionSchemaType,
} from '../../remotes/types/collection'

export function parsePageProperties(
  properties: NotionPageBlockResponse['properties'],
  schema: NotionCollectionItemSchema | undefined
) {
  if (properties == null || schema == null) {
    return {}
  }

  const items = Object.entries(properties)
    .map(([key, value]): NotionPageBlockProperty | null => {
      return parseNotionPageBlockProperty(schema, key, value)
    })
    .filter(isNotNil)

  return createObjectByKey(items, (x) => x.name)
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
