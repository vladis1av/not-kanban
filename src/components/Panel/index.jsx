import { Droppable } from 'react-beautiful-dnd';

import { ReactComponent as ClearIconSvg } from '../../assests/cancel.svg';
import { Card, AddForm } from '../';
import './Panel.scss';

const Panel = ({
  title,
  cards,
  panelIndex,
  onAddPanel,
  onAddCard,
  onRemovePanel,
}) => {
  const removePanelHandler = () => {
    onRemovePanel(panelIndex, title);
  };

  return cards ? (
    <Droppable type="CARDS" droppableId={`panel-${panelIndex}`}>
      {(provided) => (
        <div
          className={'panel'}
          {...provided.droppableProps}
          ref={provided.innerRef}>
          <div className="panel__container">
            {title && (
              <div className="panel__title">
                <b>{title}</b>

                <ClearIconSvg
                  className="remove-icon-svg"
                  onClick={removePanelHandler}
                />
              </div>
            )}
            {cards && (
              <div className="panel__items">
                {cards.map((card, i) => (
                  <Card key={card + i} panelIndex={panelIndex} cardIndex={i}>
                    {card}
                  </Card>
                ))}
                {provided.placeholder}
              </div>
            )}

            <AddForm
              panelIndex={panelIndex}
              isEmptyPanel={!cards}
              onAddPanel={onAddPanel}
              onAddCard={onAddCard}
            />
          </div>
        </div>
      )}
    </Droppable>
  ) : (
    <div className="panel">
      <div className="panel__container">
        <AddForm
          panelIndex={panelIndex}
          isEmptyPanel={!cards}
          onAddPanel={onAddPanel}
          onAddCard={onAddCard}
        />
      </div>
    </div>
  );
};

export default Panel;
