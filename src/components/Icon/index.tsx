import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface Props {
  icon: IconDefinition;
  size?: string;
  color?: string;
  className?: string;
  spin?: boolean;
}

const Icon: React.FC<Props> = (props) => {
  const { icon, size = 'sm', ...restProps } = props;

  return <FontAwesomeIcon icon={icon} size={size} {...restProps} />;
};

export default Icon;
