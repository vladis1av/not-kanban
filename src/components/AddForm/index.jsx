import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Card, Button } from '../';
import { ReactComponent as ClearIconSvg } from '../../assests/cancel.svg';
import { ReactComponent as AddIconSvg } from '../../assests/add.svg';
import useOutside from '../../hooks/useOutside';
import './AddForm.scss';

const AddForm = ({ isEmptyPanel, onAddPanel, onAddCard, panelIndex }) => {
  const dispatch = useDispatch();

  const [showFrom, setShowForm] = useState(false);
  const [value, setValue] = useState('');

  const textareaRef = useRef(null);
  const formRef = useRef(null);

  const onAdd = () => {
    if (isEmptyPanel) {
      dispatch(onAddPanel(value));
    } else {
      dispatch(onAddCard({ panelIndex, text: value }));
    }
    setValue('');
    setShowForm(false);
  };

  const toggleShowForm = () => {
    setShowForm(!showFrom);
    if (value.trim() !== '') {
      setValue('');
    }
  };

  useOutside(formRef, toggleShowForm);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showFrom]);

  return (
    <>
      {showFrom ? (
        <div className="add-form" ref={formRef}>
          <div className="add-form__input">
            <Card>
              <textarea
                rows="3"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                ref={textareaRef}
                placeholder={
                  isEmptyPanel
                    ? 'Введите название колонки'
                    : 'Введите текст карточки'
                }></textarea>
            </Card>
            <div className="add-form__bottom">
              <Button onClick={onAdd} disabled={value.trim() === ''}>
                {isEmptyPanel ? 'Добавить  колонку' : 'Добавить карточку'}
              </Button>
              <ClearIconSvg
                className="remove-icon-svg"
                onClick={toggleShowForm}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="add-form__bottom">
          <div onClick={toggleShowForm} className="add-form__bottom-add-btn">
            <AddIconSvg className="add-form__bottom-add-btn__svg-add" />
            <span>
              {isEmptyPanel
                ? 'Добавить еще одну  колонку'
                : 'Добавить еще одну  карточку'}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default AddForm;
