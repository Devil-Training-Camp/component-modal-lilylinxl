import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface Props {
  icon: IconDefinition;
  size?: string;
  color?: string;
}

const Icon: React.FC<Props> = (props) => {
  const { icon, size = '1em', color = 'currentColor',...restProps } = props;

  return (
    <FontAwesomeIcon icon={icon} size={size} color={color} {...restProps}/>
  );
};

export default Icon;
