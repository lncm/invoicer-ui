import React from 'react';
import PropTypes from 'prop-types';

const LNInvoiceWindow = ({ bolt11 }) => {
  console.log("LNInvoiceWindow");
  console.log(bolt11);

  function copythis() {
    document.execCommand("copy");
  }

  function selecttextarea() {
    document.getElementById("lndtextarea").select();
  }
  return (
      <textarea id="lndtextarea" onSelect={copythis} onClick={selecttextarea}>
        {bolt11}
      </textarea>
  );
};

LNInvoiceWindow.propTypes = {
  bolt11: PropTypes.string.isRequired,
};


export default LNInvoiceWindow;
