const reorderCards = ({ state, source, destination }) => {
  const { index: sourceCardIndex, droppableId: sourceId } = source;
  const { index: destinationCardIndex, droppableId: destinationId } =
    destination;
  const sourceColumnIndex = parseInt(sourceId.replace('panel-', ''));
  const destinationColumnIndex = parseInt(destinationId.replace('panel-', ''));

  return state.map((item, currentColumnIndex) => {
    if (destinationColumnIndex === currentColumnIndex) {
      const [sourceCard] = state[sourceColumnIndex].cards.splice(
        sourceCardIndex,
        1,
      );
      const destinationCards = Array.from(state[destinationColumnIndex].cards);
      destinationCards.splice(destinationCardIndex, 0, sourceCard);
      item.cards = destinationCards;
    }

    return item;
  });
};

export default reorderCards;
