import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { Panel } from './components';
import {
  addCard,
  addPanel,
  removePanel,
  reorderCard,
} from './redux/slices/panels';

function App() {
  const dispatch = useDispatch();
  const items = useSelector(({ panels }) => panels);

  const onRemovePanel = (panelIndex, panelName) => {
    if (
      global.confirm(`Вы действительно хотите удалить колонку ${panelName}`)
    ) {
      dispatch(removePanel(panelIndex));
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    dispatch(
      reorderCard({
        source,
        destination,
      }),
    );
  };

  return (
    <div className="app">
      <DragDropContext onDragEnd={onDragEnd}>
        {items.map((item, i) => (
          <Panel
            {...item}
            key={i}
            panelIndex={i}
            onAddPanel={addPanel}
            onAddCard={addCard}
            onRemovePanel={onRemovePanel}
          />
        ))}
      </DragDropContext>

      <Panel onAddPanel={addPanel} onAddCard={addCard} />
    </div>
  );
}

export default App;
