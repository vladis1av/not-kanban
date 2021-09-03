import { Draggable } from 'react-beautiful-dnd';

import './Card.scss';

const Card = ({ cardIndex, panelIndex, children }) =>
  typeof cardIndex !== 'undefined' ? (
    <Draggable
      draggableId={`card-${panelIndex}-${cardIndex}`}
      index={cardIndex}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <span>{children}</span>
        </div>
      )}
    </Draggable>
  ) : (
    <div className="card">{children}</div>
  );

export default Card;
