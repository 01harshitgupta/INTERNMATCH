import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Image({ src, alt = 'Image Name', className = '', ...props }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc('/assets/images/no_image.png');
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
};

Image.defaultProps = {
  alt: 'Image Name',
  className: '',
};

export default Image;
