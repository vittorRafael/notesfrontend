import React from 'react';
import { FaTrashCan, FaTriangleExclamation } from 'react-icons/fa6';
import './Priority.css';

const Notes = ({ data, handleDelete, handlePriority }) => {
  return (
    <li className={data.priority ? 'notepad-infos-priority' : 'notepad-infos'}>
      <div>
        <strong>{data.title}</strong>
        <div>
          <FaTrashCan size="20" onClick={() => handleDelete(data._id)} />
        </div>
      </div>
      <p>{data.notes}</p>
      <span>
        <FaTriangleExclamation
          size="20"
          onClick={() => {
            handlePriority(data._id);
          }}
        />
      </span>
    </li>
  );
};

export default Notes;
