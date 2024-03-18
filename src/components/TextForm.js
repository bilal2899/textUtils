import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TextForm(props) {
  const [text, setText] = useState("");

  const handleUpClick = () => {
    setText(text.toUpperCase());
  };

  const handleLowClick = () => {
    setText(text.toLowerCase());
  };

  const handleClearClick = () => {
    setText("");
  };

  const handleCopyClick = () => {
    // Check if the browser supports the clipboard API
    if (navigator.clipboard) {
      // Write the text to the clipboard
      navigator.clipboard
        .writeText(text)
        .then(() => {
          // If copying was successful, provide feedback to the user
          alert("Text copied to clipboard!");
        })
        .catch((error) => {
          // If copying failed, handle the error
          console.error("Error copying text to clipboard:", error);
        });
    } else {
      // If the clipboard API is not supported, provide an alternative method or message to the user
      console.warn(
        "Clipboard API not supported. Please copy the text manually."
      );
    }
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="container" style={{color:props.mode === 'dark' ? 'white' : '#042743'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            onChange={handleOnChange}
            id="myBox"
            rows="8"
            value={text}
            style={{ backgroundColor: props.mode === "dark" ? "grey" : "white", color:props.mode === 'dark' ? 'white' : '#042743'}}>
            </textarea>
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleLowClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleCopyClick}>
          Copy to Clipboard
        </button>
        <button
          type="button"
          className="btn btn-danger mx-2"
          onClick={handleClearClick}>
          Clear Text
        </button>
      </div>
      <div className="container my-3" style={{color:props.mode === 'dark' ? 'white' : '#042743'}}>
        <h2>Your text summary</h2>
        <p>
          {text.split(" ").length} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").length} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Enter something to preview here"}</p>
      </div>
    </>
  );
}

TextForm.defaultProps = {
  heading: "Heading here",
};

TextForm.propTypes = {
  heading: PropTypes.string.isRequired,
};
