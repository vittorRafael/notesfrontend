import * as React from 'react';
import Radio from '@mui/material/Radio';
import './RadioButton.css';

export default function RadioButton({ selectedValue, handleChangeApp }) {
  return (
    <div className="radioOptions">
      <Radio
        checked={selectedValue === 'all'}
        onChange={(e) => handleChangeApp(e.target)}
        value={'all'}
        sx={{
          color: '#ffd3ca',
          '&.Mui-checked': {
            color: '#eb8f7a',
          },
        }}
      />
      <span>Todos</span>
      <Radio
        checked={selectedValue === 'true'}
        onChange={(e) => handleChangeApp(e.target)}
        value="true"
        sx={{
          color: '#ffd3ca',
          '&.Mui-checked': {
            color: '#eb8f7a',
          },
        }}
      />
      <span>Prioridade</span>
      <Radio
        checked={selectedValue === 'false'}
        onChange={(e) => handleChangeApp(e.target)}
        value="false"
        sx={{
          color: '#ffd3ca',
          '&.Mui-checked': {
            color: '#eb8f7a',
          },
        }}
      />
      <span>Normal</span>
    </div>
  );
}
