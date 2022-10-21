import { InfiniteData } from 'react-query'

type Node = {
  id: string
}

type QueryPayload<ITEM> = {
  nextCursor?: string
  items: ITEM[]
}

export function appendData<ITEM, PAGE extends QueryPayload<ITEM>>(newItem: ITEM, infiniteData?: InfiniteData<PAGE>): InfiniteData<PAGE> {
  if (!infiniteData) return { pageParams: [], pages: [] }

  let firstPage = infiniteData.pages[0]
  firstPage.items = [newItem, ...firstPage.items]

  return infiniteData
}

export function prependData<ITEM, PAGE extends QueryPayload<ITEM>>(newItem: ITEM, infiniteData?: InfiniteData<PAGE>): InfiniteData<PAGE> {
  if (!infiniteData) return { pageParams: [], pages: [] }

  let lastPage = infiniteData.pages[infiniteData.pages.length - 1]
  lastPage.items = [newItem, ...lastPage.items]

  return infiniteData
}

export function removeItem<ITEM extends Node, PAGE extends QueryPayload<ITEM>>(
  itemId: string,
  infiniteData?: InfiniteData<PAGE>
): InfiniteData<PAGE> {
  if (!infiniteData) return { pageParams: [], pages: [] }

  return {
    pageParams: infiniteData.pageParams,
    pages: infiniteData.pages.map(page => ({
      nextCursor: page.nextCursor,
      items: page.items.filter(item => item.id !== itemId)
    }))
  }
}
