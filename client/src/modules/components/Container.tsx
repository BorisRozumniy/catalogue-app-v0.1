import React, { useState, useEffect, useCallback } from 'react'
import { Card } from './Card'
import update from 'immutability-helper'

const style = {
  width: 400,
  border: "1px solid",
  padding: 15,
  background: "yellow",
  borderRadius: 5
}

interface IProps {
  items: Array<Item>;
}
export interface Item {
  _id: string
  text: string
  title: string
}

export interface ContainerState {
  cards: Item[]
}

// interface GenericsExampleProps<T> {
//   children: (item: T) => React.ReactNode
//   items: Array<T>
// }

// export function Container<T>({ items, children }: GenericsExampleProps<T>) {
export function Container({ items }: IProps) {
  {
    const [cards, setCards] = useState(items)
    useEffect(() => {
      setCards(items)
    }, [items])

    useEffect(() => {
      console.log(cards)
    }, [cards])

    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        )
      },
      [cards],
    )
    return (
      <>
        {items && <div style={style}>{cards.map((card, i) => renderCard(card, i, moveCard))}</div>}
      </>
    )
  }
}

const renderCard = (card: { _id: string; title: string }, index: number, moveCard: (dragIndex: number, hoverIndex: number) => void) => {
  return (
    <Card
      key={card._id}
      index={index}
      id={card._id}
      // text={card.text || ''}
      moveCard={moveCard}
    >{card.title}</Card>
  )
}