interface CardListItem {
  id: string;
  title: string;
  description: string;
  members: string[];
}

interface CardList {
  listId: string;
  name: string;
  cards: CardListItem[];
}

export { CardList, CardListItem };
